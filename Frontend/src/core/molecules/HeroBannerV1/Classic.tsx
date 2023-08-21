import Heading from 'core/atoms/Heading/Heading';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container } from 'react-bootstrap';
import getColorContrast from 'utils/getColorContrast';
import type { HeroBannerV1Props } from './heroBannerV1';
import style from './Classic.module.scss';

const Classic = (props: HeroBannerV1Props): JSX.Element => {
  const { HeroBannerTitle, Description, MobileImage, Image: DesktopImage } = props?.fields || {};

  const { ContentColorContrast } = props?.params || {};
  const contentColorContrast = !!ContentColorContrast ? JSON.parse(ContentColorContrast).name : '';
  const { textColorClassName, bgColorClassName } = getColorContrast(contentColorContrast);

  return (
    <div className={style.herobannerv1_classic}>
      <Container fluid>
        <div className={style.image_container}>
          <Image className={'img-fluid d-none d-md-block'} field={DesktopImage} priority />{' '}
          <Image
            className={'img-fluid d-md-none'}
            field={!MobileImage ? MobileImage : DesktopImage}
            priority
          />{' '}
        </div>
      </Container>

      {(HeroBannerTitle?.value || Description?.value) && (
        <section className={`${textColorClassName} ${bgColorClassName}`}>
          <div className={style.title_description_container}>
            <Container className={style.container}>
              <Heading
                level={2}
                text={HeroBannerTitle}
                className={`${style.title} ${textColorClassName} ${bgColorClassName}`}
              />
              <RichText field={Description} className={style.description} />
            </Container>
          </div>
        </section>
      )}
    </div>
  );
};

export default Classic;
