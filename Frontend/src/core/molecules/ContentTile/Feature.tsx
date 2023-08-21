import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { ContentTileProps } from './contentTile';
import styles from './Feature.module.scss';
import getColumnWidths from 'utils/getColumnWidths';
import Heading from 'core/atoms/Heading/Heading';
import getRoundedCorners, { RoundedCornersType } from 'utils/getRoundedCorners';

const Feature = (props: ContentTileProps): JSX.Element => {
  const { Title, Description, HideColumnInMobile, FeaturedContent } = props?.fields || {};
  const {
    ColumnWidth,
    FeaturedContentAlignment,
    BackgroundColorContrast,
    FeaturedContentColorContrast,
  } = props?.params || {};

  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';
  const featuredContentColorContrast = !!FeaturedContentColorContrast
    ? JSON.parse(FeaturedContentColorContrast).name
    : '';
  const {
    textColorClassName: featuredContrastTextColor,
    bgColorClassName: featuredContrastBgColor,
  } = getColorContrast(featuredContentColorContrast);

  const { textColorClassName: bgContrastTextColor, bgColorClassName: bgContrastBgColor } =
    getColorContrast(backgroundColorContrast);

  const { featuredContentColumn, contextColumn } = getColumnWidths(
    ColumnWidth || '6,6',
    FeaturedContentAlignment || 'left'
  );

  const roundedCornersClass = getRoundedCorners(
    props?.params?.RoundedCorners as RoundedCornersType
  );
  return (
    <Container className={classNames('component-spacing', {})}>
      <Row className={`no-gutters ${roundedCornersClass}`}>
        <Col
          lg={parseInt(featuredContentColumn)}
          className={classNames({
            'order-md-2': FeaturedContentAlignment == 'right',
            'd-none d-md-block': !HideColumnInMobile,
          })}
        >
          <div
            className={classNames(styles.featured_content_heading, {
              [`${featuredContrastTextColor}`]: !!featuredContrastTextColor,
              [`${featuredContrastBgColor}`]: !!featuredContrastBgColor,
            })}
          >
            <RichText field={FeaturedContent} className="rteContent feature" />
          </div>
        </Col>
        <Col lg={parseInt(contextColumn)}>
          <div
            className={classNames([`${styles.featured_wrapper} height_100`], {
              [`${bgContrastTextColor}`]: !!bgContrastTextColor,
              [`${bgContrastBgColor}`]: !!bgContrastBgColor,
            })}
          >
            <Heading level={1} className={classNames(styles.featured_heading, {})} text={Title} />
            <div className={styles.featured_description}>
              <RichText field={Description} className="rteContent feature" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Feature;
