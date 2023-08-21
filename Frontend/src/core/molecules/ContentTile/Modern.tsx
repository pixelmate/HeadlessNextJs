import { RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { ContentTileProps } from './contentTile';
import styles from './Modern.module.scss';
import getColumnWidths from 'utils/getColumnWidths';
import Image from 'core/atoms/Image';
import Heading from 'core/atoms/Heading/Heading';
import getRoundedCorners, { RoundedCornersType } from 'utils/getRoundedCorners';

const Modern = (props: ContentTileProps): JSX.Element => {
  const { Title, Description, Image: DesktopImage, Link: CtaLink } = props?.fields || {};
  const {
    ColumnWidth,
    FeaturedContentAlignment,
    DescriptionColorContrast,
    TitleColorContrast,
    BackgroundColorContrast,
    HideColumnInMobile,
  } = props?.params || {};

  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';
  const { textColorClassName: bgContrastTextColor, bgColorClassName: bgContrastBgColor } =
    getColorContrast(backgroundColorContrast);

  const titleColorContrast = !!TitleColorContrast ? JSON.parse(TitleColorContrast).name : '';
  const { textColorClassName: titleContrastTextColor, bgColorClassName: titleContrastBgColor } =
    getColorContrast(titleColorContrast);

  const descriptionColorContrast = !!DescriptionColorContrast
    ? JSON.parse(DescriptionColorContrast).name
    : '';
  const roundedCornersClass = getRoundedCorners(
    props?.params?.RoundedCorners as RoundedCornersType
  );

  const {
    textColorClassName: descriptionContrastTextColor,
    bgColorClassName: descriptionContrastBgColor,
  } = getColorContrast(descriptionColorContrast);

  const { textColorClassName: ctaContrastTextColor, bgColorClassName: ctaContrastBgColor } =
    getColorContrast(props?.fields?.CtaColorContrast?.name);

  const { featuredContentColumn, contextColumn } = getColumnWidths(
    ColumnWidth || '6,6',
    FeaturedContentAlignment || 'left'
  );
  return (
    <Container className="component-spacing">
      <Row className={`no-gutters ${styles.modern_row} ${roundedCornersClass}`}>
        <Col
          lg={parseInt(featuredContentColumn)}
          className={classNames(`align-Image-vertically-center`, {
            'order-lg-2': FeaturedContentAlignment === 'right',
            'd-none d-md-block': HideColumnInMobile === '1',
          })}
        >
          <Image field={DesktopImage} className="img-fill" />
        </Col>
        <Col lg={parseInt(contextColumn)}>
          <div
            className={classNames(`d-flex flex-column h-100`, {
              [`${bgContrastBgColor}`]: !!bgContrastBgColor,
              [`${bgContrastTextColor}`]: !!bgContrastTextColor,
            })}
          >
            {!!Title?.value && (
              <Heading
                level={3}
                text={Title}
                className={classNames(styles.modern_heading, {
                  [`${titleContrastBgColor}`]: !!titleContrastBgColor,
                  [`${titleContrastTextColor}`]: !!titleContrastTextColor,
                })}
              />
            )}
            <div
              className={classNames('flex-grow-1', styles.modern_description, {
                [`${descriptionContrastTextColor}`]: !!descriptionContrastTextColor,
                [`${descriptionContrastBgColor}`]: !!descriptionContrastBgColor,
              })}
            >
              <RichText
                field={Description}
                className={`rteContent modern d-flex h-100 flex-column ${styles.modern_rich_text_style}`}
              />
              {!!CtaLink && (
                <div className="text-center text-md-start">
                  <Link
                    key={'ksjs'}
                    field={CtaLink}
                    className={classNames(styles.modern_CTA, {
                      [`${ctaContrastTextColor}`]: !!ctaContrastTextColor,
                      [`${ctaContrastBgColor}`]: !!ctaContrastBgColor,
                    })}
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Modern;
