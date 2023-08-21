import Heading from 'core/atoms/Heading/Heading';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container } from 'react-bootstrap';
import getColorContrast from 'utils/getColorContrast';
import type { HeroBannerV1Props } from './heroBannerV1';
import style from './Modern.module.scss';

const Modern = (props: HeroBannerV1Props): JSX.Element => {
  const {
    HeroBannerTitle,
    Title,
    Description,
    Image: DesktopImage,
    MobileImage,
  } = props?.fields || {};
  const { ContentColorContrast } = props?.params || {};

  const contentColorContrast = !!ContentColorContrast ? JSON.parse(ContentColorContrast).name : '';
  const { textColorClassName, bgColorClassName } = getColorContrast(contentColorContrast);
  const { textColorClassName: flipTextColorClassName, bgColorClassName: flipBgColorClassName } =
    getColorContrast(contentColorContrast, true);

  return (
    <div className={style.herobannerv1_modern}>
      <section className={style.image_container}>
        <div className={style.image_container}>
          <Image className={'img-fluid d-none d-md-block'} field={DesktopImage} priority />{' '}
          <Image
            className={'img-fluid d-md-none'}
            field={!MobileImage ? MobileImage : DesktopImage}
            priority
          />{' '}
        </div>
        <Heading
          level={6}
          text={HeroBannerTitle}
          className={`d-none d-md-block ${style.title}  
        ${textColorClassName} ${bgColorClassName}`}
        />
        <Heading
          level={6}
          text={HeroBannerTitle}
          className={`d-md-none ${style.title}  ${flipBgColorClassName} ${flipTextColorClassName}`}
        />
      </section>
      <section
        className={`${style.title_description_container} ${textColorClassName} ${bgColorClassName}`}
      >
        <Container>
          <Heading level={1} text={Title} className={style.herobanner_title} />
          <RichText field={Description} className={style.description} />
        </Container>
      </section>
    </div>
  );
};

export default Modern;
