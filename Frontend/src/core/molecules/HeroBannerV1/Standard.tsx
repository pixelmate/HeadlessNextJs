import Heading from 'core/atoms/Heading';
import Image from 'core/atoms/Image';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import getColorContrast from 'utils/getColorContrast';
import getTextAlignment, { type AlignmentType } from 'utils/getTextAlignment';
import type { HeroBannerV1Props } from './heroBannerV1';
import style from './Standard.module.scss';
import classNames from 'classnames';
import { Col, Container, Row } from 'react-bootstrap';

const Standard = (props: HeroBannerV1Props): JSX.Element => {
  const { HeroBannerTitle, MobileImage, Image: DesktopImage } = props?.fields || {};
  const { TextAlignment, BackgroundColorContrast, PlaceholderAlignment } = props?.params || {};
  const { rendering } = props || {};
  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';
  const { textColorClassName, bgColorClassName } = getColorContrast(backgroundColorContrast);
  const headingClass = getTextAlignment(TextAlignment as AlignmentType);

  return (
    <Container fluid className={style.herov1Container}>
      <Row>
        <Col className="p-0">
          <div className={`${style.herobannerv1_standard}`}>
            <div className={`${style.image_container}`}>
              <Image
                className={`img-fluid d-none d-md-block ${style.image_hero}`}
                field={DesktopImage}
                priority={true}
              />
              <Image
                className={`img-fluid d-md-none ${style.image_hero}`}
                field={MobileImage.value?.src ? MobileImage : DesktopImage}
                priority
              />
              <div className={`${style.placeholder} container-md mx-auto`}>
                <div className="d-md-flex flex-column">
                  {HeroBannerTitle.value && (
                    <div
                      className={classNames(style.herobannerv1_standard_title, {
                        'order-lg-2': PlaceholderAlignment !== 'bottom',
                      })}
                    >
                      <Heading
                        level={1}
                        text={HeroBannerTitle}
                        className={`${textColorClassName} ${bgColorClassName} ${headingClass} `}
                      />
                    </div>
                  )}
                  <div
                    className={classNames({
                      'order-lg-1 pt-lg-5': PlaceholderAlignment !== 'bottom',
                    })}
                  >
                    <Placeholder name="jss-banner-contents" rendering={rendering} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Standard;
