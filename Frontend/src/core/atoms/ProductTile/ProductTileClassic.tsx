import { ProductTile as ProductTileType } from 'core/molecules/ProductDetail/productDetail.types';
import styles from './ProductTileClassic.module.scss';
import Image from '../Image/Image';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import { Button } from 'react-bootstrap';

export type ProductTileProps = {
  tile: ProductTileType;
  ctaColor: ColorFields;
  textAlignment: string;
  priceColor: string;
};

const ProductTileClassic = (props: ProductTileProps) => {
  const { tile, ctaColor, priceColor, textAlignment } = props || {};
  const { Name, Description, Image: image, Link: link, Price, IsAvailable, Size } = tile || {};
  const { t } = useI18n();

  const isLeft = textAlignment === 'left';
  const unavailableStyles = {
    backgroundColor: ctaColor?.fields?.BackgroundColor?.value,
    backgroundOpacity: ctaColor?.fields?.BackgroundOpacity?.value,
    color: ctaColor?.fields?.FontColor?.value,
  };

  const priceLabel = Price ? `${t('Products_FromPrice')} $${Price.toFixed(2)}` : null;

  const unavailableLabel = t('Products_ProductUnavailable');

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className="panel-title">
          <span>{Name}</span>
        </span>
      </div>
      <div className={styles.body}>
        <div className="row">
          <div
            className={`${
              isLeft
                ? 'col-12 col-md-4 col-lg-3 mb-4 text-center'
                : 'col-12 col-md-3 col-lg-2 mb-4 text-center'
            }`}
          >
            <Link href={link || ''}>
              <a>
                <Image field={image}></Image>
              </a>
            </Link>
          </div>
          <div
            className={`${isLeft ? 'col-12 col-md-8 col-lg-9' : 'col-12 col-md-5 col-lg-7'}`}
            dangerouslySetInnerHTML={{ __html: Description }}
          ></div>
          <div className={`${styles.priceBlock} col-12 col-md-4 col-lg-3`}>
            <h4 className={`${styles.packText}  ${isLeft ? 'text-center' : 'text-end'}`}>{Size}</h4>
            <h3 className={`${styles.priceText} ${isLeft ? 'text-center' : 'text-end'}`}>
              {IsAvailable ? (
                <span style={{ color: priceColor }}>{priceLabel}</span>
              ) : (
                <div className="p-1 text-center rounded" style={unavailableStyles}>
                  {unavailableLabel}
                </div>
              )}
            </h3>
          </div>
        </div>
        <div className="row SalesAids-panel top-buffer">
          <div className={`${isLeft ? '' : 'text-end col-6 col-md-2 col-xl-2'}`}></div>
          <div
            className={`${
              isLeft
                ? 'text-center col-12 col-md-4 col-lg-3'
                : 'text-end col-12 col-md-10 col-xl-10'
            }`}
          >
            <Link href={link || ''}>
              <a>
                <Button variant="warning" className={styles.button}>
                  {t('Cart_AddToBag')}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTileClassic;
