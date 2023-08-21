import Head from 'next/head';
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  Field,
  PlaceholdersData,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Scripts from 'src/core/atoms/Scripts';
import Seo, { getSeoData } from 'src/core/atoms/Seo';
import { Col, Container, Row } from 'react-bootstrap';
import Modal from 'core/atoms/Modal/ModalComponent';
import Spinner from 'core/atoms/Spinner';
import FormValidationProvider from 'core/molecules/GenericForm/FormContext';
import { ScrollToTop } from 'core/molecules/ScrollToTop/ScrollToTop';
import style from './Layout.module.scss';
import classNames from 'classnames';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

const excludePlaceholderList = ['jss-header', 'jss-col-left', 'jss-col-right', 'jss-footer'];

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  PageTitle: Field;
  EnableScrollToTop: Field;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  const fields = route?.fields as RouteFields;
  let placeholdersInRoute;
  if (route?.placeholders) {
    const placeholders = route?.placeholders as PlaceholdersData;

    placeholdersInRoute = Object.keys(placeholders)?.filter(
      (key: string) => !excludePlaceholderList.includes(key)
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bgImg = (layoutData?.sitecore?.route?.fields as any)?.BackgroundImage?.value;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageEditing;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.PageTitle?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}${layoutData.sitecore.context.Favicon}`} />
      </Head>
      <Seo {...getSeoData(layoutData)} />
      {route && route?.placeholders && (
        <>
          <header className={classNames(style.header, { 'position-relative': isEditing })}>
            <Placeholder name="jss-header" rendering={route} />
          </header>
          {bgImg && bgImg?.src && (
            <div
              className={`${style.background_image} w-100 h-100 position-absolute top-0`}
              style={{
                background: `url(${bgImg.src
                  .replace('http://cd', '')
                  .replace('http://localhost:3000', '')})`,
              }}
            ></div>
          )}
          <Modal />
          <Spinner />

          <FormValidationProvider>
            <>
              {placeholdersInRoute?.map((key: string) => {
                return <Placeholder key={key} name={key} rendering={route} />;
              })}

              {/* Bg color will come from json(dynamically) */}
              {route?.placeholders['jss-col-left']?.length > 0 &&
                route?.placeholders['jss-col-right']?.length > 0 && (
                  <div className="bg-color-grey">
                    <Container className="mx-auto">
                      <Row className="justify-content-md-between pt-4 ">
                        <Col xs={12} lg={8}>
                          <Placeholder name="jss-col-left" rendering={route} />
                        </Col>
                        <Col xs={12} lg={4} className="px-4">
                          <Placeholder name="jss-col-right" rendering={route} />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )}
            </>
          </FormValidationProvider>
          <Placeholder name="jss-footer" rendering={route} />
        </>
      )}
      <ScrollToTop enabled={Boolean(fields?.EnableScrollToTop?.value)} />
    </>
  );
};

export default Layout;
