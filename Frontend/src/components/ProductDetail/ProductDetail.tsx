import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Col, Container, Row } from 'react-bootstrap';
import style from 'core/molecules/ProductDetail/ProductDetail.module.scss';
import { ProductDetailProps } from 'core/molecules/ProductDetail/productDetail.types';
import BreadcrumbTitle from 'core/molecules/ProductDetail/BreadcrumbTitle';
import MediaGallery from 'core/molecules/ProductDetail/MediaGallery';
import { VARIANTS } from 'constants/variants';
import ProductAttributes from 'core/molecules/ProductDetail/ProductAttributes';

const ProductDetail = (props: ProductDetailProps): JSX.Element => {
  return (
    <Container className={style.productDetail}>
      <Row>
        {props?.fields?.Variation?.fields?.Value?.value?.toLowerCase() === VARIANTS.CLASSIC && (
          <BreadcrumbTitle variation={VARIANTS.CLASSIC} />
        )}
        <MediaGallery
          galleryItems={props?.fields?.ProductMediaGallery}
          variation={
            props?.fields?.Variation?.fields?.Value?.value?.toLowerCase() || VARIANTS.MODERN
          }
        />
        <Col className={style.productDetail_content}>
          {props?.fields?.Variation?.fields?.Value?.value?.toLowerCase() === VARIANTS.MODERN && (
            <BreadcrumbTitle variation={VARIANTS.MODERN} />
          )}
          <div className="h6">
            <ProductAttributes commerceFeatures={props?.fields?.CommerceFeatures} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withDatasourceCheck()<ProductDetailProps>(ProductDetail);
