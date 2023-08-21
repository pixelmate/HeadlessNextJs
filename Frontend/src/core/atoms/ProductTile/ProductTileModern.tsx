import { ProductTile as ProductTileType } from 'core/molecules/ProductDetail/productDetail.types';
import styles from './ProductTileModern.module.scss';
import Image from '../Image/Image';
import Link from 'next/link';
import { useI18n } from 'next-localization';

export type ProductTileProps = {
  tile: ProductTileType;
  ctaColor: ColorFields;
  priceColor: string;
};

const ProductTileModern = (props: ProductTileProps) => {
  const { tile, ctaColor, priceColor } = props || {};
  const { Name, Description, Price, IsAvailable, Image: image, Link: link } = tile || {};
  const { t } = useI18n();

  const priceLabel = Price ? `${t('Products_FromPrice')} $${Price.toFixed(2)}` : null;

  const unavailableLabel = t('Products_ProductUnavailable');

  const unavailableStyles = {
    backgroundColor: ctaColor?.fields?.BackgroundColor?.value,
    backgroundOpacity: ctaColor?.fields?.BackgroundOpacity?.value,
    color: ctaColor?.fields?.FontColor?.value,
  };

  return (
    <div className="item col-12 col-md-6 col-lg-4 col-xl-3">
      <Link href={link || ''}>
        <a className={styles.linkWrapper}>
          <div
            className={`${styles.thumbnail} productcategory d-flex flex-column justify-content-between`}
          >
            <div>
              <div className={`${styles.imageWrapper} text-center`}>
                <Image field={image} />
              </div>
              <div
                className={`${styles.captionWrapper} d-flex align-items-center justify-content-center`}
              >
                <h4 className={`${styles.caption} text-center`}>{Name}</h4>
              </div>
              <p
                className={`${styles.description}`}
                dangerouslySetInnerHTML={{ __html: Description }}
              ></p>
            </div>
            <div>
              <div className={styles.outstock}>
                {IsAvailable ? <div /> : <div style={unavailableStyles}>{unavailableLabel}</div>}
              </div>
              <div className="text-center margin-t-auto">
                <div
                  className={`${styles.price} price caption fromprice width-100`}
                  style={{ color: priceColor }}
                >
                  {priceLabel || ''}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductTileModern;
