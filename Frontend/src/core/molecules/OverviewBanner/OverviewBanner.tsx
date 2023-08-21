import { RichText } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col, Container } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import Image from 'core/atoms/Image';
import { OverviewBannerProps } from './overviewBanner.type';
import styles from './OverviewBanner.module.scss';
import TrustPilot from 'core/atoms/TrustPilot/TrustPilot';
import { ImageLink } from 'core/atoms/ImageLinkList';
import getColorContrast from 'utils/getColorContrast';
import Heading from 'core/atoms/Heading';
import { useAtom } from 'jotai';
import { modalAtom, createModal } from 'data/atoms/modal';
import { VideoIcon } from 'core/atoms/Icons';
import { MODAL } from 'constants/modal';

const OverviewBanner = (props: OverviewBannerProps): JSX.Element => {
  const {
    RatingLogoLink,
    RatingLogoImage,
    TrustPilotBusinessUnitId,
    Title,
    Description,
    Image: DesktopImage,
    MobileImage,
  } = props?.fields || {};

  const { CtaColorContrast } = props?.params || {};
  const ctaColorContrast = !!CtaColorContrast ? JSON.parse(CtaColorContrast)?.name : '';
  const [, setContent] = useAtom(modalAtom);
  const handleClick = () => {
    setContent(createModal(MODAL.VIDEO, props?.fields?.Link?.value?.url as string));
  };
  const { t } = useI18n();
  const { textColorClassName, bgColorClassName } = getColorContrast(ctaColorContrast);
  return (
    <Container fluid className={styles.overviewBannerWrapper}>
      <Row className={`mx-0 ${styles.overviewBanner}`}>
        <Image
          field={DesktopImage}
          className={`img-fluid d-none d-md-block mx-auto position-relative px-0 ${styles.overviewBanner_image}`}
        />
        <Image
          field={!MobileImage?.value?.src ? DesktopImage : MobileImage}
          className="img-fill d-md-none mobile position-relative px-0"
        />
        <Row className={styles.overviewBanner_bannerInformation}>
          <Col lg={6} md={8} className="offset-md-1 d-flex flex-column">
            <Heading text={Title} level={3} className="py-4" />
            <div className="order-md-1">
              <div
                role="button"
                tabIndex={0}
                aria-label="watch video"
                onClick={handleClick}
                className={`${textColorClassName} ${bgColorClassName} ${styles.overviewBanner_button} text-uppercase my-4`}
              >
                <VideoIcon height={30} width={30} />
                <span className="px-1 h7">{props?.fields?.Link?.value?.text}</span>
              </div>
            </div>
            <RichText
              field={Description}
              className={`bg-opacity-25 bg-white body-copy ${styles.overviewBanner_description}`}
            />
            <Row
              className={`${styles.overviewBanner_trustcontainer} order-md-2 my-3 justify-content-between `}
            >
              <Col className={`${styles.overviewBanner_trustpilot} align-self-center text-center`}>
                <TrustPilot
                  review={t('TrustPilot_BannerReview', {
                    PRODUCT_TRUSTPILOT_ID: TrustPilotBusinessUnitId?.value,
                  })}
                />
              </Col>
              <Col className=" align-self-center text-center">
                {props?.fields?.Link?.value?.linktype ? (
                  <ImageLink image={RatingLogoImage} link={RatingLogoLink} />
                ) : (
                  <div>
                    <Image field={RatingLogoImage} className={'position-relative'} />
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default OverviewBanner;
