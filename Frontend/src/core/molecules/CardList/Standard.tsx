import { RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { CardList, CardListProps } from './cardList';
import styles from './Standard.module.scss';
import Heading from 'core/atoms/Heading';
import getFontColor from 'utils/getFontColor';

const Standard = (props: CardListProps): JSX.Element => {
  /* JSON Values */

  const { Title, Description, SubTitle, CardList, Link: CtaLink } = props?.fields || {};
  const {
    CardSize,
    BackgroundColorContrast,
    CardColorContrast,
    CtaColorContrast,
    CardCtaColorContrast,
    CardTitleFontColor,
  } = props?.params || {};

  /* Getting values for component background Contrast */
  const cardColorContrast = !!CardColorContrast ? JSON.parse(CardColorContrast).name : '';
  const ctaColorContrast = !!CtaColorContrast ? JSON.parse(CtaColorContrast).name : '';
  const cardCtaColorContrast = !!CardCtaColorContrast ? JSON.parse(CardCtaColorContrast).name : '';
  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';

  const {
    textColorClassName: containerTextContrastTextColor,
    bgColorClassName: containerBgContrastBgColor,
  } = getColorContrast(backgroundColorContrast);

  /* Getting values for component CTA Contrast */
  const { textColorClassName: ctaTextContrastTextColor, bgColorClassName: ctaBgContrastBgColor } =
    getColorContrast(ctaColorContrast);

  /* Getting values for Card CTA Contrast */
  const {
    textColorClassName: cardCtaTextContrastTextColor,
    bgColorClassName: cardCtaBgContrastBgColor,
  } = getColorContrast(cardCtaColorContrast);

  /* Getting values for Card Color Contrast */
  const {
    textColorClassName: cardListTextContrastTextColor,
    bgColorClassName: cardListBgContrastBgColor,
  } = getColorContrast(cardColorContrast);

  /*Getting Card Title Font Color */
  const { textColorClassName: cardTitleTextContrastTextColor } = getFontColor(CardTitleFontColor);

  return (
    <Container
      fluid
      className={classNames({
        [`${containerBgContrastBgColor}`]: !!BackgroundColorContrast,
        [`${containerTextContrastTextColor}`]: !!BackgroundColorContrast,
      })}
    >
      <Row className="no-gutters py-5">
        <Col>
          <Container>
            {Title?.value && (
              <Heading
                level={2}
                text={Title}
                className={classNames(styles.standard_heading, {
                  [`${cardTitleTextContrastTextColor}`]: !!CardTitleFontColor,
                })}
              />
            )}
            {SubTitle?.value && (
              <Heading level={2} text={SubTitle} className={styles.standard_subHeading} />
            )}
            {Description?.value && (
              <RichText field={Description} className={styles.rteContent_componentDescription} />
            )}
            {/* Rendering Card List */}
            <Row
              className={classNames(' justify-content-center', {
                [`${containerBgContrastBgColor}`]: !!BackgroundColorContrast,
                [`${containerTextContrastTextColor}`]: !!BackgroundColorContrast,
              })}
            >
              {!!CardList &&
                CardList?.map((item: CardList) => {
                  const listItems = item?.fields;
                  const backgroundColorContrast = !!BackgroundColorContrast
                    ? JSON.parse(BackgroundColorContrast).name
                    : '';
                  const {
                    textColorClassName: cardTextContrastTextColor,
                    bgColorClassName: cardBgContrastBgColor,
                  } = getColorContrast(backgroundColorContrast);

                  const cardContent = (
                    <div
                      className={classNames(
                        `${styles.standard_cardWrapper}`,
                        !!BackgroundColorContrast && [
                          `${cardBgContrastBgColor} ${cardTextContrastTextColor}`,
                        ],
                        !!CardColorContrast && [
                          `${cardListBgContrastBgColor} ${cardListTextContrastTextColor}`,
                        ]
                      )}
                    >
                      {listItems?.Icon?.value && (
                        <div className="text-center">
                          <Image field={listItems?.Icon} className={styles.standard_cardIcon} />
                        </div>
                      )}
                      {listItems?.Image?.value && (
                        <div className="text-center">
                          <Image field={listItems?.Image} className={styles.standard_cardImage} />
                        </div>
                      )}
                      {listItems?.Title?.value && (
                        <Heading
                          level={3}
                          text={listItems?.Title}
                          className={`${styles.standard_cardHeading} text-center`}
                        />
                      )}
                      {listItems?.SubTitle?.value && (
                        <Heading
                          level={6}
                          text={listItems?.SubTitle}
                          className={`${styles.standard_cardSubTitle} text-center`}
                        />
                      )}

                      {listItems?.Description && (
                        <RichText
                          field={listItems?.Description}
                          className={`${styles.rteContent_description} text-center h6`}
                        />
                      )}
                      {listItems?.Link?.value?.href && CardSize === 'large' && (
                        <Link
                          field={listItems?.Link}
                          className={classNames(styles.standard_cardCTA, {
                            [`${cardCtaBgContrastBgColor}`]: !!CardCtaColorContrast,
                            [`${cardCtaTextContrastTextColor}`]: !!CardCtaColorContrast,
                          })}
                        />
                      )}
                    </div>
                  );
                  return (
                    <Col sm={12} md={CardSize === 'large' ? 4 : 3} key={item?.id}>
                      {item?.fields?.Link?.value?.href && CardSize !== 'large' ? (
                        <Link field={item.fields.Link} className="text-decoration-none">
                          {cardContent}
                        </Link>
                      ) : (
                        <>{cardContent}</>
                      )}
                    </Col>
                  );
                })}
            </Row>

            {/*Rendering component CTA */}
            {CtaLink?.value?.href && (
              <Link
                field={CtaLink}
                className={classNames({
                  [`${ctaBgContrastBgColor}`]: !!CtaColorContrast,
                  [`${ctaTextContrastTextColor}`]: !!CtaColorContrast,
                })}
              />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Standard;
