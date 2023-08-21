import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Col, Container, Row } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import Heading from 'core/atoms/Heading';
import type { ProductHighlightsProps, Tag } from './ProductHighlightsComponent.types';
import style from './ProductHighlightsComponent.module.scss';

const ProductHighlightsComponent = (props: ProductHighlightsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const { Title, SubTitle, Image: ProductImage, HideTrustPilotRatings } = props?.fields || {};
  const { Tags } = sitecoreContext.route?.fields || {};
  const Trustpilot = sitecoreContext.route?.fields?.TrustpilotId as ValueField;
  const { t } = useI18n();

  const getTagLine = () => {
    const tags: string[] = [];
    (Tags as Tag[])?.forEach((element) => {
      tags.push(element?.fields?.Value?.value);
    });
    if (tags.length > 0) {
      return <h4 className={style.tags}>{tags.join(' | ')}</h4>;
    }
    return <></>;
  };

  return (
    <Container className={style.productHighlightContainer}>
      <Row className="mx-0">
        <Col className="p-0">
          <div className={`${style.productHighlightContainer_body} bg-white`}>
            <div className="d-flex position-relative flex-column justify-content-center">
              <Image field={ProductImage} className="d-none d-lg-block position-absolute end-0" />
              <Heading level={1} text={Title} className={`${style.title} fw-normal`} />
              <Heading level={2} text={SubTitle} className={`fw-normal ${style.sub_title}`} />
              {getTagLine()}
              {!HideTrustPilotRatings?.value && (
                <div
                  className="d-flex"
                  dangerouslySetInnerHTML={{
                    __html: t('Products_TrustPilot_Review', {
                      PRODUCT_TRUSTPILOT_ID: Trustpilot?.value,
                    }),
                  }}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductHighlightsComponent;
