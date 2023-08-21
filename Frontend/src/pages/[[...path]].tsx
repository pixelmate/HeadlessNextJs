import { useEffect } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from 'src/layout/NotFound';
import Layout from 'src/layout/Layout';
import {
  RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  handleEditorFastRefresh,
  EditingComponentPlaceholder,
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
// different componentFactory method will be used based on whether page is being edited
import { componentFactory, editingComponentFactory } from 'temp/componentFactory';
import { sitemapFetcher } from 'lib/sitemap-fetcher';
import { useAuthorization, useNewUser, useRefreshToken } from 'data/user';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { isNewUserAtom } from 'data/atoms/isNewUser';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { getEnv } from 'config/get-env';
import { CALLBACK_URL, REFERRER_URL } from 'constants/query-config';
import { ROUTES } from 'utils/routes';
import { PREVIEW_MODE } from 'constants/page';

const SitecorePage = ({ notFound, componentProps, layoutData }: SitecorePageProps): JSX.Element => {
  const userLoginPage = layoutData?.sitecore?.context?.UserLoginPage as string;
  const userLoginCheckoutPage = layoutData?.sitecore?.context?.UserLoginCheckoutPage as string;
  const isAuthRequired = (
    layoutData?.sitecore?.route?.fields?.DisablePublicAccess as { value: boolean }
  )?.value;
  const isUserRequired = (layoutData?.sitecore?.route?.fields?.IsUserRequired as { value: boolean })
    ?.value;
  const isEditing = layoutData?.sitecore?.context?.pageEditing;
  const isPreview = layoutData?.sitecore?.context?.pageState === PREVIEW_MODE;
  const router = useRouter();
  const [{ isAuthenticated, refreshToken }] = useAtom(authorizationAtom);
  const { mutate: signIn } = useAuthorization(
    isAuthRequired ? `${userLoginPage}?${CALLBACK_URL}=${router.asPath}` : `${router.asPath}`
  );
  const { mutate: updateAccessToken } = useRefreshToken();

  const { redirectTo } = useNewUser(
    isUserRequired ? `${userLoginCheckoutPage}?${REFERRER_URL}=${router.asPath}` : ROUTES.HOME
  );
  const [isNewUser] = useAtom(isNewUserAtom);

  useEffect(() => {
    window.localStorage.setItem('IS_NEW_USER', `${isNewUser}`);
    if (!isAuthenticated && !isNewUser && isUserRequired && !isEditing) {
      redirectTo();
    }
  }, [isAuthenticated, isNewUser, isUserRequired, isEditing, redirectTo]);

  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && refreshToken) {
      updateAccessToken({ refreshToken });
    } else if (!isAuthenticated) {
      signIn(undefined);
    }
  }, [isAuthenticated, refreshToken, signIn, updateAccessToken]);
  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  if (
    (isAuthRequired && !isAuthenticated && !isEditing && !isPreview) ||
    (isUserRequired && !isAuthenticated && !isEditing && !isNewUser)
  ) {
    return <div />;
  }

  const isComponentRendering =
    layoutData.sitecore.context.renderingType === RenderingType.Component;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={isEditing ? editingComponentFactory : componentFactory}
        layoutData={layoutData}
      >
        {/*
        Sitecore Pages supports component rendering to avoid refreshing the entire page during component editing.
        If you are using Experience Editor only, this logic can be removed, Layout can be left.
      */}
        {isComponentRendering ? (
          <EditingComponentPlaceholder rendering={layoutData.sitecore.route} />
        ) : (
          <Layout layoutData={layoutData} />
        )}
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async (context) => {
  // Fallback, along with revalidate in getStaticProps (below),
  // enables Incremental Static Regeneration. This allows us to
  // leave certain (or all) paths empty if desired and static pages
  // will be generated on request (development mode in this example).
  // Alternatively, the entire sitemap could be pre-rendered
  // ahead of time (non-development mode in this example).
  // See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

  const paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';
  let blogItems = 0;
  const blogItemsLimit = (getEnv('BLOG_PAGES_SSG_LIMIT') as number) || 100;

  if (process.env.NODE_ENV !== 'development' && !process.env.DISABLE_SSG_FETCH) {
    try {
      // Note: Next.js runs export in production mode
      const _paths = await sitemapFetcher.fetch(context);
      _paths.forEach((path) => {
        if (path.params.path[0] === 'blogs' && blogItems < blogItemsLimit) {
          paths.push(path);
          blogItems++;
        }
        if (path.params.path[0] !== 'blogs') {
          paths.push(path);
        }
      });
    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  return {
    paths,
    fallback,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  // const props = await sitecorePagePropsFactory.create(context);
  const props = await queryClient.fetchQuery(['layoutData'], () =>
    sitecorePagePropsFactory.create(context)
  );

  // await queryClient.prefetchQuery([API_ENDPOINTS.USERS_ME], client.users.me);

  // Check if we have a redirect (e.g. custom error page)
  if (props.redirect) {
    return {
      redirect: props.redirect,
    };
  }

  return {
    props: {
      ...props,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};

export default SitecorePage;
