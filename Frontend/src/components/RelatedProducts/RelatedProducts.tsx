import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import Heading from 'core/atoms/Heading';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import styles from './RelatedProducts.module.scss';
import { RelatedProductsProps } from './RelatedProducts.types';

const RelatedProducts = (props: RelatedProductsProps): JSX.Element => {
  const { RelatedProducts, Title } = props?.fields || {};
  const slidesPerView = 4;
  const slidesCount = RelatedProducts.length / slidesPerView;
  const result = [];
  for (let i = 0; i < slidesCount; i++) {
    const startIndex = i * slidesPerView;
    const endIndex = startIndex + slidesPerView;
    const slice = RelatedProducts.slice(startIndex, endIndex);
    result.push(slice);
  }
  return (
    <Container className="d-none d-md-block">
      <div>
        <div className={styles.relatedProducts}>
          <Heading text={Title} level={5} className={`${styles.title} px-4`} />
          <Carousel
            variant="dark"
            className={`${styles.navButtons} `}
            indicators={false}
            controls={RelatedProducts.length >= 5 ? true : false}
          >
            {result.map((item, index) => (
              <Carousel.Item key={index}>
                <Row key={index}>
                  {item.map((item) => (
                    <Col
                      key={item?.id}
                      xs={6}
                      lg={3}
                      className={`${styles.productContainer} text-center mt-4`}
                    >
                      <a className="text-decoration-none" href={item?.url}>
                        <div className={`${styles.imageContainer} mx-auto `}>
                          <Image field={item?.fields?.Image} />
                        </div>
                        <Heading
                          className={styles.productText}
                          text={item?.fields?.Title}
                          level={6}
                        />
                      </a>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </Container>
  );
};

export default RelatedProducts;
