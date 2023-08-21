import { Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryBadgesProps } from './CategoryBadgesComponent.types';
import styles from './CategoryBadgesComponent.module.scss';

const CategoryBadgesComponent = (props: CategoryBadgesProps): JSX.Element => {
  const { Badges } = props?.fields || {};
  return (
    <Container className="justify-content-center mx-auto d-flex">
      {Badges.length > 0 && (
        <Row className={`${styles.badgeContainer} mx-1`}>
          {Badges.map((badge) => {
            return (
              <Col
                xs={4}
                key={badge.id}
                className={`${styles.badgeContainer_badges} d-flex flex-column justify-content-space align-items-center`}
              >
                <div className={styles.badgeContainer_badges_img}>
                  <Image className="img-fluid" field={badge?.fields?.Icon} />
                </div>
                <span className={`h9 text-center ${styles.badgeContainer_badges_text}`}>
                  <Text field={badge?.fields?.Text} />
                </span>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default CategoryBadgesComponent;
