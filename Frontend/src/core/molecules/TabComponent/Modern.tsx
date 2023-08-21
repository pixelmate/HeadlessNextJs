import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import Image from 'core/atoms/Image';
import { Col, Row } from 'react-bootstrap';
import { TabComponentType } from './TabComponent.type';
import styles from './Modern.module.scss';

const Modern = (props: TabComponentType) => {
  const { FeaturedIcons, Description } = props?.fields || {};
  return (
    <Row className={`${styles.modern_Container} align-items-center`}>
      <Col lg={7} xs={12} className="body-copy">
        <RichText field={Description} />
      </Col>
      <Col lg={5} xs={12}>
        <div className={`${styles.iconContainer} list-unstyled d-flex flex-row`}>
          {FeaturedIcons?.map((item, index) => {
            if (item?.fields?.Icon?.value) {
              return (
                <div className={`text-center ${styles.icons}`} key={index}>
                  <Image className={styles.icons_img} field={item?.fields?.Icon} />
                  <p className={`text-uppercase ${styles.icons_text}`}>
                    <Text field={item?.fields?.Text} />
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </Col>
    </Row>
  );
};

export default Modern;
