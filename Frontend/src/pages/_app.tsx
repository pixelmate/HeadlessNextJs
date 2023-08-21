import { useState } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SitecorePageProps } from 'lib/page-props';
import 'nprogress/nprogress.css';
import 'styles/global.scss';

//  nprogress provides a loading indicator on page/route changes
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const [queryClient] = useState(() => new QueryClient());
  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // If app is not multilingual, next-localization and references to it can be removed.
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...rest} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App;
