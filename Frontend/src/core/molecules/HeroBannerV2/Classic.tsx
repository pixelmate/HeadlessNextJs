import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import Image from 'core/atoms/Image';
import type { HeroBannerV2Props } from './heroBannerV2';
import styles from './Classic.module.scss';
import getColorContrast from 'utils/getColorContrast';
import getFontColor from 'utils/getFontColor';
import Heading from 'core/atoms/Heading/Heading';

const Classic = (props: HeroBannerV2Props): JSX.Element => {
  const { Title, SubTitle, Image: DesktopImage, MobileImage, FeaturedIcons } = props?.fields || {};
  const { TextAlignment, SubTitleColorContrast, FeaturedIconsFontColor, BackgroundColorContrast } =
    props?.params || {};

  const subTitleColorContrast = !!SubTitleColorContrast
    ? JSON.parse(SubTitleColorContrast)?.name
    : '';

  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast)?.name
    : '';
  const { textColorClassName, bgColorClassName } = getColorContrast(backgroundColorContrast);
  const {
    textColorClassName: subTitletextColorClassName,
    bgColorClassName: subTitlebgColorClassName,
  } = getColorContrast(subTitleColorContrast);
  const { textColorClassName: iconTextClassName } = getFontColor(FeaturedIconsFontColor);

  return (
    <Container fluid className={`p-0 ${styles.heroBannerV2_classic}`}>
      <div
        className={classNames('position-relative d-flex', {
          ' align-items-center ': TextAlignment?.toLocaleLowerCase().includes('center'),
          bgColorClassName,
        })}
      >
        <div className={!DesktopImage ? styles.responsive_image : ' w-100 '}>
          <Image className={'img-fluid d-none d-md-block w-100'} field={DesktopImage} />
          <Image
            className={`img-fluid d-md-none ${styles.responsive_image}`}
            field={!MobileImage ? MobileImage : DesktopImage}
          />
        </div>
        <div
          className={classNames(
            'position-absolute d-inline p-3 m-3',
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
              level={1}
              text={Title}
              className={`
              d-none d-md-block py-2
              ${styles.heading_title}
              ${textColorClassName}
            )`}
            />
          )}

          {!!SubTitle.value && (
            <Heading
              level={4}
              className={`px-3
              ${styles.heading_subtitle}
              ${subTitletextColorClassName}
              ${subTitlebgColorClassName}`}
              text={SubTitle}
            />
          )}
          <div className="py-3 px-0 d-none d-md-block">
            <div className={'list-unstyled d-flex flex-row text-center'}>
              {FeaturedIcons?.map((item) => {
                if (item?.fields?.Icon?.value) {
                  return (
                    <div className="text-center d-flex flex-column" key={item.id}>
                      <Image className={styles.heroBannerV2_classic_img} field={item.fields.Icon} />
                      <Heading
                        className={`text-uppercase ${iconTextClassName} ${styles.heroBannerV2_classic_text}`}
                        text={item.fields.Text}
                        level={7}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 d-block d-sm-none">
        <div className="list-unstyled d-flex flex-row justify-content-around">
          {FeaturedIcons?.map((item) => {
            if (item?.fields?.Icon?.value) {
              return (
                <div className={`text-center ${styles.icons}`} key={item.id}>
                  <Image className={styles.icons_img} field={item.fields.Icon} />
                  <p className={`text-uppercase ${styles.icons_text}`}>
                    <Text field={item.fields.Text} />
                  </p>
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </div>
    </Container>
  );
};

export default Classic;
