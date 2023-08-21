import Image from 'core/atoms/Image';
import { ProductMediaGalleryItem } from './productDetail.types';
import { Col } from 'react-bootstrap';

const MediaGalleryModern = (props: { galleryItems: ProductMediaGalleryItem[] }): JSX.Element => {
  return (
    <Col xs={12} md={5} lg={6}>
      <Image field={props?.galleryItems[0]?.fields?.Image} className="img-fill" />
    </Col>
  );
};

export default MediaGalleryModern;
