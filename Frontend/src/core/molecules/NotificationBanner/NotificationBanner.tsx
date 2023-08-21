import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import getColorContrast from 'utils/getColorContrast';
import style from './NotificationBanner.module.scss';
import type { NotificationBannerType } from './notificationBanner.type';
import Image from 'core/atoms/Image';

const NotificationBanner = (): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const notificationBanner = sitecoreContext?.NotificationBanner as NotificationBannerType;
  const { textColorClassName, bgColorClassName } = getColorContrast(
    notificationBanner?.BackgroundColorContrast?.name
  );
  const { textColorClassName: ctaTextColorClassName, bgColorClassName: ctaBgColorClassName } =
    getColorContrast(notificationBanner?.CtaColorContrast?.name);

  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      {sitecoreContext?.NotificationBanner ? (
        <div className={!isClicked ? 'd-block' : 'd-none'}>
          <Container fluid className={`${bgColorClassName} ${style.contentWrapper}`}>
            <Container fluid="lg">
              <Row className={`${style.content} align-items-center py-2 justify-content-center`}>
                <Col md={'auto'} sm={12} className="p-0">
                  <div className={`${style.imgWrapper}`}>
                    <Image className={style.img} field={notificationBanner?.Icon} />
                  </div>
                </Col>
                <Col md={9} sm={12} className="px-md-4 flex-grow-1">
                  <p className={`${textColorClassName} my-2`}>{notificationBanner?.Description}</p>
                </Col>
                <Col md={'auto'} sm={12} className="p-0">
                  <Button
                    {...(notificationBanner?.Link?.value?.href !== 'javascript:void(0)'
                      ? { href: notificationBanner?.Link?.value?.href }
                      : {})}
                    onClick={() => setIsClicked(!isClicked)}
                    variant="secondary"
                    className={`${ctaBgColorClassName} ${ctaTextColorClassName}`}
                  >
                    {notificationBanner?.Link?.value?.text}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      ) : null}
    </>
  );
};

export default NotificationBanner;
