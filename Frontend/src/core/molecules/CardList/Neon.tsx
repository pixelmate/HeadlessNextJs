import { RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { CardList, CardListProps } from './cardList';
import styles from './Neon.module.scss';
import Heading from 'core/atoms/Heading';
import getFontColor from 'utils/getFontColor';

const Neon = (props: CardListProps): JSX.Element => {
  /* JSON Values */
  const { Title, Description, SubTitle, CardList, Link: Ctalink } = props?.fields || {};
  const {
    BackgroundColorContrast,
    CardColorContrast,
    CtaColorContrast,
    CardCtaColorContrast,
    CardTitleFontColor,
    CardSize,
  } = props?.params || {};

  /* Getting values for component background Contrast */
  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';
  const {
    textColorClassName: containerTextContrastTextColor,
    bgColorClassName: containerBgContrastBgColor,
  } = getColorContrast(backgroundColorContrast);

  /* Getting values for component CTA Contrast */
  const ctaColorContrast = !!CtaColorContrast ? JSON.parse(CtaColorContrast).name : '';
  const { textColorClassName: ctaTextContrastTextColor, bgColorClassName: ctaBgContrastBgColor } =
    getColorContrast(ctaColorContrast);

  /* Getting values for Card CTA Contrast */
  const cardCtaColorContrast = !!CardCtaColorContrast ? JSON.parse(CardCtaColorContrast).name : '';
  const {
    textColorClassName: cardCtaTextContrastTextColor,
    bgColorClassName: cardCtaBgContrastBgColor,
  } = getColorContrast(cardCtaColorContrast);

  /* Getting values for Card Color Contrast */
  const cardColorContrast = !!CardColorContrast ? JSON.parse(CardColorContrast).name : '';
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
                className={classNames(styles.neon_heading, {
                  [`${cardTitleTextContrastTextColor}`]: !!!CardTitleFontColor,
                })}
              ></Heading>
            )}
            <div>
              {SubTitle?.value && (
                <Heading level={4} text={SubTitle} className={styles.neon_subHeading} />
              )}
            </div>
            {Description?.value && (
              <RichText field={Description} className={styles.rteContent_componentDescription} />
            )}
            {/* Rendering Card List */}
            <Row className={`${styles.neon_componentSpacing} justify-content-center`}>
              {CardList?.map((item: CardList) => {
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
                      `${styles.neon_cardWrapper}`,
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
                        <Image field={listItems?.Icon} className={styles.neon_cardIcon} />
                      </div>
                    )}
                    {listItems?.Image?.value && (
                      <div className="text-center">
                        <Image field={listItems?.Image} className={styles.neon_cardImage} />
                      </div>
                    )}
                    {listItems?.Title?.value && (
                      <Heading
                        level={3}
                        text={listItems?.Title}
                        className={`${styles.neon_cardHeading} text-center`}
                      />
                    )}
                    {listItems?.SubTitle?.value && (
                      <Heading
                        level={6}
                        text={listItems?.SubTitle}
                        className={`${styles.neon_cardSubTitle} text-center`}
                      />
                    )}

                    {listItems?.Description && (
                      <RichText
                        field={listItems?.Description}
                        className={`${styles.rteContent_description} text-center`}
                      />
                    )}
                    {listItems?.Link?.value?.href && CardSize === 'large' && (
                      <Link
                        field={listItems?.Link}
                        className={classNames(styles.neon_cardCTA, {
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
            {Ctalink?.value?.href && (
              <h4 className={styles.neon_readMore}>
                <Link
                  field={Ctalink}
                  className={classNames({
                    [`${ctaBgContrastBgColor}`]: !!CtaColorContrast,
                    [`${ctaTextContrastTextColor}`]: !!CtaColorContrast,
                  })}
                />
              </h4>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Neon;
