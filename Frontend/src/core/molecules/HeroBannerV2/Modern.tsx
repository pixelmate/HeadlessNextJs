import { Container } from 'react-bootstrap';
import classNames from 'classnames';
import Image from 'core/atoms/Image';
import type { HeroBannerV2Props } from './heroBannerV2';
import styles from './Modern.module.scss';
import getColorContrast from 'utils/getColorContrast';
import Heading from 'core/atoms/Heading/Heading';

const Modern = (props: HeroBannerV2Props): JSX.Element => {
  const { Title, Image: DesktopImage, MobileImage } = props?.fields || {};
  const { TextAlignment, BackgroundColorContrast } = props?.params || {};

  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast)?.name
    : '';
  const { textColorClassName, bgColorClassName } = getColorContrast(backgroundColorContrast);

  return (
    <Container fluid className={`p-0 ${styles.heroBannerV2_modern}`}>
      <div
        className={classNames('position-relative d-flex', {
          'd-flex align-items-center ': TextAlignment?.toLocaleLowerCase().includes('center'),
          bgColorClassName,
        })}
      >
        <div className={!DesktopImage ? styles.responsive_image : 'w-100'}>
          <Image className={'img-fluid d-none d-md-block'} field={DesktopImage} />
          <Image
            className={`img-fluid d-md-none ${styles.responsive_image}`}
            field={!!MobileImage ? MobileImage : DesktopImage}
          />
        </div>
        <div
          className={classNames(
            'position-absolute d-inline p-3 m-2',
            {
              'top-0': TextAlignment?.toLocaleLowerCase().includes('top'),
            },
            {
              'bottom-0': TextAlignment?.toLocaleLowerCase().includes('bottom'),
            },
            {
              'end-0': TextAlignment?.toLocaleLowerCase().includes('right'),
            }
          )}
        >
          {!!Title.value && (
            <Heading
              level={2}
              className={`d-none d-md-block py-2 px-4 
            ${styles.modern_title}
            ${textColorClassName}`}
              text={Title}
            />
          )}
        </div>
      </div>
      {!!Title.value && (
        <Heading
          level={2}
          className={`text-center d-md-none py-2 px-4 
          ${styles.modern_title}
          ${textColorClassName}`}
          text={Title}
        />
      )}
    </Container>
  );
};

export default Modern;
