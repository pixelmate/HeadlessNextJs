import { RichText, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import getColorContrast from 'utils/getColorContrast';
import type { CardList, CardListProps } from './cardList';
import styles from './Modern.module.scss';
import Heading from 'core/atoms/Heading';
import getFontColor from 'utils/getFontColor';

const Modern = (props: CardListProps): JSX.Element => {
  /* Destructuring Values */

  const { Title, Description, SubTitle, CardList, Link: Ctalink } = props.fields || {};

  const {
    CardColorContrast,
    BackgroundColorContrast,
    CtaColorContrast,
    CardCtaColorContrast,
    CardTitleFontColor,
    CardCtaAlignment,
    CardImageAlignment,
    CardSize,
  } = props.params || {};
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
      <Row className="no-gutters py-2">
        <Col>
          <Container>
            <Row>
              <Col>
                {Title?.value && (
                  <Heading
                    level={2}
                    text={Title}
                    className={classNames(styles.modern_heading, {
                      [`${cardTitleTextContrastTextColor}`]: !!CardTitleFontColor,
                    })}
                  />
                )}
                {SubTitle?.value && <Heading level={4} text={SubTitle} className="text-center" />}
                {Description?.value && (
                  <RichText
                    field={Description}
                    className={styles.rteContent_componentDescription}
                  />
                )}
                {/* Rendering Card List */}
                <Row
                  className={classNames(
                    `${styles.modern_componentCardWrapper} justify-content-center`,
                    {}
                  )}
                >
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
                          !!BackgroundColorContrast && [
                            `${cardBgContrastBgColor} ${cardTextContrastTextColor}`,
                          ],
                          !!CardColorContrast && [
                            `${cardListBgContrastBgColor} ${cardListTextContrastTextColor}`,
                          ]
                        )}
                      >
                        {listItems?.Icon?.value && (
                          <div className="order-0 text-center">
                            <Image field={listItems?.Icon} className={styles.modern_cardIcon} />
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
                              level={6}
                              text={listItems?.Title}
                              className={`${styles.modern_cardHeading} text-center`}
                            />
                          )}
                          {listItems?.SubTitle?.value && (
                            <div className="subTitle text-center">
                              <Text field={listItems?.SubTitle} />
                            </div>
                          )}
                        </div>

                        {listItems?.Image?.value && (
                          <div
                            className={classNames('order-2', {
                              ['order-2']: CardImageAlignment === 'center',
                              ['order-4']: CardImageAlignment === 'bottom',
                            })}
                          >
                            <Image field={listItems?.Image} className="img-fill" />
                          </div>
                        )}
                        {listItems?.Description && (
                          <RichText
                            field={listItems?.Description}
                            className={classNames(`${styles.rteContent_description} order-3`, {
                              ['order-3']: CardImageAlignment === 'bottom',
                              ['order-4']: CardImageAlignment === 'center',
                            })}
                          />
                        )}
                        {listItems?.Link?.value?.href && CardSize === 'large' && (
                          <h6
                            className={classNames('order-4 text-center', {
                              ['order-1']: CardCtaAlignment === 'bottom',
                              ['order-4']: CardCtaAlignment === 'top',
                            })}
                          >
                            <Link
                              field={listItems?.Link}
                              className={classNames(styles.modern_cardCTA, {
                                [`${cardCtaBgContrastBgColor}`]: !!CardCtaColorContrast,
                                [`${cardCtaTextContrastTextColor}`]: !!CardCtaColorContrast,
                              })}
                            />
                          </h6>
                        )}
                      </div>
                    );
                    return (
                      <Col sm={12} md={CardSize === 'large' ? 4 : 3} key={item?.id}>
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
                {Ctalink?.value?.href && (
                  <Link
                    field={Ctalink}
                    className={classNames({
                      [`${ctaBgContrastBgColor}`]: !!CtaColorContrast,
                      [`${ctaTextContrastTextColor}`]: !!CtaColorContrast,
                    })}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Modern;
