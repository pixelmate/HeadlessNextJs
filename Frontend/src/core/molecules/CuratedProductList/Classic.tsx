import { Col, Container, Row } from 'react-bootstrap';
import { Link as SitecoreLink, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { CuratedProductListProps } from './CuratedProductList';
import Image from 'core/atoms/Image/Image';
import Heading from 'core/atoms/Heading/Heading';
import style from './Classic.module.scss';
import Link from 'next/link';
import { DEFAULT_PRODUCT_ALIGNMENT } from 'constants/productListing';
import getAlignment, { AlignmentType } from 'utils/getAlignment';

const Classic = (props: CuratedProductListProps) => {
  const { Title, ProductCardList, Link: CardLink } = props.fields || {};
  const alignmentClass = getAlignment(
    (props?.params?.Alignment || DEFAULT_PRODUCT_ALIGNMENT) as AlignmentType
  );
  return (
    <>
      {ProductCardList[0]?.fields?.Product && !!ProductCardList?.length && (
        <Container fluid className={style.curatedProductlist_classic}>
          <Row className="no-gutters py-5">
            <Col>
              <Container className="p-0">
                {Title?.value && (
                  <Heading
                    level={4}
                    text={Title}
                    className={style.curatedProductlist_classic_title}
                  />
                )}
                <Row className={alignmentClass}>
                  {ProductCardList?.map((item) => (
                    <Link href={item?.fields?.Product?.url || ''} key={item.id}>
                      <Col xs={12} sm={6} lg={3} className={style.curatedProductlist_classic_card}>
                        <div
                          className={`${style.curatedProductlist_classic_card_section} rounded-4`}
                        >
                          <div className={style.curatedProductlist_classic_card_img}>
                            <Image field={item?.fields?.Product?.fields?.Image} />
                          </div>
                          <Heading
                            level={6}
                            text={item?.fields?.Product?.fields?.Title}
                            className={style.curatedProductlist_classic_card_title}
                          />
                          <RichText
                            field={item?.fields?.Product?.fields?.Description}
                            className={style.curatedProductlist_classic_card__description}
                          />
                        </div>
                      </Col>
                    </Link>
                  ))}
                  {CardLink?.value?.href && (
                    <h4 className="text-end">
                      <SitecoreLink
                        field={CardLink}
                        className={style.curatedProductlist_classic_cta}
                      />
                    </h4>
                  )}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Classic;
