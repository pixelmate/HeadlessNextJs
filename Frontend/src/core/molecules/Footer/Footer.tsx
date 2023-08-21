import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SocialLinks from './SocialLinks';
import FooterNavigation from './FooterNavigation';
import FooterTrustBadges from './FooterTrustBadges';
import type { FooterProps } from './footer.types';
import styles from './Footer.module.scss';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import TrustPilot from 'core/atoms/TrustPilot/TrustPilot';
import { useI18n } from 'next-localization';

const Footer = (props: FooterProps) => {
  const { t } = useI18n();
  const { rendering } = props || {};
  return (
    <footer className={styles.footer}>
      <Container className={styles.footer_container}>
        <Row>
          <Col lg={8} className="d-flex flex-column justify-content-between">
            <FooterNavigation menuItems={props?.fields?.Menu} />
            <div className="d-none d-lg-flex justify-content-between align-items-center">
              <TrustPilot
                className={`${styles.footer_trustpilot} d-flex`}
                review={t('TrustPilot_FooterReview', {
                  PRODUCT_TRUSTPILOT_ID: props?.fields?.TrustPilotBusinessUnitId?.value,
                })}
              />
              <FooterTrustBadges items={props?.fields?.TrustBadges} />
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.footer_media}>
              <SocialLinks items={props?.fields?.SocialMediaHandles} />
              <Placeholder name="jss-footer-contents" rendering={rendering} />
            </div>
            <div className="d-flex d-lg-none justify-content-between align-items-center">
              <TrustPilot
                className={`${styles.footer_trustpilot} d-flex`}
                review={t('TrustPilot_FooterReview', {
                  PRODUCT_TRUSTPILOT_ID: props?.fields?.TrustPilotBusinessUnitId?.value,
                })}
              />
              <FooterTrustBadges items={props?.fields?.TrustBadges} />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
