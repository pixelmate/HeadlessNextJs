import { Link, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Heading from 'core/atoms/Heading';
import Image from 'core/atoms/Image';
import { Col, Container, Row } from 'react-bootstrap';
import getColorContrast from 'utils/getColorContrast';
import styles from './Banner.module.scss';
import { BannerProps } from './Banner.types';

const Banner = (props: BannerProps): JSX.Element => {
  const {
    BannerTitle,
    Title,
    Description,
    Link: ButtonLink,
    Image: BannerImage,
  } = props?.fields || {};
  const { BackgroundColorContrast, CtaColorContrast } = props?.params || {};
  const ButtonColorContrast = !!CtaColorContrast ? JSON?.parse(CtaColorContrast)?.name : '';
  const { textColorClassName: CTAColorClassName, bgColorClassName: CTAbgColorClassName } =
    getColorContrast(ButtonColorContrast);
  const BgColorContrast = !!BackgroundColorContrast
    ? JSON?.parse(BackgroundColorContrast)?.name
    : '';
  const { textColorClassName, bgColorClassName } = getColorContrast(BgColorContrast);
  return (
    <Container className={`${styles.banner} mb-5`}>
      <Row>
        <Col>
          <Heading
            level={4}
            text={BannerTitle}
            className={`${textColorClassName} text-center pb-4 `}
          />
          <div>
            <Image field={BannerImage} className={`${styles.image} img-fluid`} />
          </div>
          <div className={`${bgColorClassName} p-4 `}>
            <Heading level={3} text={Title} className={`${textColorClassName} pb-4 pt-2`} />
            <div className="mb-5">
              <RichText field={Description} />
            </div>
            <Link
              type="button"
              field={ButtonLink}
              className={`${CTAColorClassName} ${CTAbgColorClassName} ${styles.button} text-decoration-none`}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
