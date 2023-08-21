import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { ContentTileProps } from './contentTile';
import styles from './Classic.module.scss';
import getColumnWidths from 'utils/getColumnWidths';
import Image from 'core/atoms/Image';
import getRoundedCorners, { RoundedCornersType } from 'utils/getRoundedCorners';

const Classic = (props: ContentTileProps): JSX.Element => {
  const { Title, Description, HideColumnInMobile, Image: DesktopImage } = props?.fields || {};
  const { ColumnWidth, FeaturedContentAlignment, DescriptionColorContrast } = props?.params || {};

  const descriptionColorContrast = !!DescriptionColorContrast
    ? JSON.parse(DescriptionColorContrast).name
    : '';

  const {
    textColorClassName: descriptionContrastTextColor,
    bgColorClassName: descriptionContrastBgColor,
  } = getColorContrast(descriptionColorContrast);

  const { featuredContentColumn, contextColumn } = getColumnWidths(
    ColumnWidth || '6,6',
    FeaturedContentAlignment || 'left'
  );

  const roundedCornersClass = getRoundedCorners(
    props?.params?.RoundedCorners as RoundedCornersType
  );

  return (
    <Container className="component-spacing">
      <Row className={`no-gutters ${roundedCornersClass}`}>
        <Col
          lg={parseInt(featuredContentColumn)}
          className={classNames('d-flex align-items-center justify-content-center', {
            'order-md-2': FeaturedContentAlignment === 'right',
            'd-none d-md-block': !HideColumnInMobile,
          })}
        >
          <Image
            field={DesktopImage}
            className={classNames(styles.classic_featuredImage, 'md:inline')}
          />
        </Col>
        <Col lg={parseInt(contextColumn)}>
          {props?.fields?.Title?.value && (
            <div
              className={classNames(styles.classic_heading, {
                [`${descriptionContrastBgColor}`]: !!descriptionContrastBgColor,
                [`${descriptionContrastTextColor}`]: !!descriptionContrastTextColor,
              })}
            >
              <Text field={Title} />
            </div>
          )}
          <div
            className={classNames(
              styles.classic_description,
              {
                [`${descriptionContrastBgColor}`]: !!descriptionContrastBgColor,
                [`${descriptionContrastTextColor}`]: !!descriptionContrastTextColor,
              },
              'text-center text-lg-start'
            )}
          >
            <RichText field={Description} className="rteContent classic" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Classic;
