import { RichText, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { CardList, CardListProps } from './cardList';
import styles from './Classic.module.scss';
import Heading from 'core/atoms/Heading';
import getFontColor from 'utils/getFontColor';

const Classic = (props: CardListProps): JSX.Element => {
  /*Destructuring Values */
  const { Title, SubTitle, Description, CardList, Link: CtaLink } = props?.fields || {};

  const {
    CardColorContrast,
    BackgroundColorContrast,
    CtaColorContrast,
    CardCtaColorContrast,
    CardTitleFontColor,
    CardCtaAlignment,
    CardImageAlignment,
    CardSize,
  } = props?.params || {};

  const cardColorContrast = !!CardColorContrast ? JSON?.parse(CardColorContrast)?.name : '';
  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON?.parse(BackgroundColorContrast)?.name
    : '';
  const ctaColorContrast = !!CtaColorContrast ? JSON?.parse(CtaColorContrast)?.name : '';
  const cardCtaColorContrast = !!CardCtaColorContrast
    ? JSON?.parse(CardCtaColorContrast)?.name
    : '';

  /* Getting values for component background Contrast */
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
      className={classNames('classic', {
        [`${containerBgContrastBgColor}`]: !!containerBgContrastBgColor == true,
        [`${containerTextContrastTextColor}`]: !!containerTextContrastTextColor == true,
      })}
    >
      <Row className="no-gutters py-md-0">
        <Col>
          <Container className="p-md-0">
            <Row>
              <Col>
                {Title?.value && <Heading level={2} text={Title}></Heading>}
                <div>{SubTitle?.value && <Heading level={2} text={SubTitle}></Heading>}</div>
                {Description?.value && <RichText field={Description} className="rteContent" />}
                {/* Rendering Card List */}
                <Row className={classNames('justify-content-center')}>
                  {CardList?.map((item: CardList) => {
                    const listItems = item?.fields;
                    const cardContent = (
                      <div
                        className={classNames(
                          `${styles.classic_cardWrapper}`,
                          !!backgroundColorContrast && [
                            `${containerBgContrastBgColor} ${containerTextContrastTextColor}`,
                          ],
                          !!CardColorContrast && [
                            `${cardListBgContrastBgColor} ${cardListTextContrastTextColor}`,
                          ]
                        )}
                      >
                        {listItems?.Icon?.value && (
                          <div className="order-0 text-center">
                            <Image field={listItems?.Icon} className="icon" />
                          </div>
                        )}
                        <div
                          className={classNames('order-1', {
                            ['order-2']: CardCtaAlignment,
                            ['order-1']: !CardCtaAlignment,
                          })}
                        >
                          {listItems?.Title?.value && (
                            <Heading
                              level={4}
                              text={listItems?.Title}
                              className={classNames(
                                `${styles.classic_cardHeading}  border-bottom border-2  border-white border-opacity-25`,
                                {
                                  [`${cardTitleTextContrastTextColor}`]: !!CardTitleFontColor,
                                }
                              )}
                            ></Heading>
                          )}
                          {listItems?.SubTitle?.value && (
                            <div className="subTitle">
                              <Text field={listItems?.SubTitle} />
                            </div>
                          )}
                        </div>
                        {listItems?.Image?.value?.src && (
                          <div
                            className={classNames(`${styles.classic_cardImageWrapper} order-2`, {
                              ['order-2']: CardImageAlignment === 'center',
                              ['order-4']: CardImageAlignment === 'bottom',
                            })}
                          >
                            <Image field={listItems?.Image} className={styles.classic_cardImage} />
                          </div>
                        )}
                        <div
                          className={classNames(
                            `${styles.classic_descriptionImageWrapper} order-3`,
                            {
                              ['order-3']: CardImageAlignment === 'bottom',
                              ['order-4']: CardImageAlignment === 'center',
                            }
                          )}
                        >
                          {listItems?.Description && (
                            <RichText
                              field={listItems?.Description}
                              className={styles.rteContent_description}
                            />
                          )}
                        </div>

                        {listItems?.Link?.value?.href && CardSize === 'large' && (
                          <Link
                            field={listItems?.Link}
                            className={classNames({
                              [`${cardCtaBgContrastBgColor}`]: !!CardCtaColorContrast,
                              [`${cardCtaTextContrastTextColor}`]: !!CardCtaColorContrast,
                            })}
                          />
                        )}
                      </div>
                    );
                    return (
                      <Col
                        sm={12}
                        lg={CardSize === 'large' ? 4 : 3}
                        key={item?.id}
                        className={styles.classic_flex}
                      >
                        {item?.fields?.Link?.value?.href && CardSize !== 'large' ? (
                          <Link field={item?.fields?.Link} className="text-decoration-none">
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
                {!!CtaLink?.value?.href && (
                  <h6 className="text-center">
                    <Link
                      field={CtaLink}
                      className={classNames(styles.classic_componentCTA, {
                        [`${ctaBgContrastBgColor}`]: !!CtaColorContrast,
                        [`${ctaTextContrastTextColor}`]: !!CtaColorContrast,
                      })}
                    />
                  </h6>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Classic;
