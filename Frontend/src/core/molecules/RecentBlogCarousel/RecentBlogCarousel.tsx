import Carousel from 'react-bootstrap/Carousel';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import type { CarouselItems, RecentBlogCarouselProps } from './recentBlogCarousel.types';
import styles from './RecentBlogCarousel.module.scss';
import Heading from 'core/atoms/Heading/Heading';
import classNames from 'classnames';

const RecentBlogCarousel = (props: RecentBlogCarouselProps): JSX.Element => {
  const { Title, CarouselItems } = props?.fields || {};

  return (
    <>
      <Heading level={7} text={Title} />
      <Carousel className={styles.gallery} indicators={false}>
        {CarouselItems?.map((item: CarouselItems, index: number) => {
          if (!item?.fields?.CarouselItem?.fields?.Image?.value?.src) {
            return null;
          }
          return (
            <Carousel.Item key={index}>
              <a href={item?.url ?? ''}>
                <Image
                  className={'w-100 d-none d-md-block h-100'}
                  field={item?.fields?.CarouselItem?.fields?.Image}
                />
                <Image
                  className={'w-100 d-md-none h-100'}
                  field={
                    item?.fields?.CarouselItem?.fields?.MobileImage?.value?.src
                      ? item?.fields?.CarouselItem?.fields?.MobileImage
                      : item?.fields?.CarouselItem?.fields?.Image
                  }
                />
                <Carousel.Caption
                  className={classNames(`${styles.caption} text-start`, {
                    [`${styles.caption_rte}`]: item?.fields?.FeatureTitle?.value,
                  })}
                >
                  {item?.fields?.FeatureTitle?.value ? (
                    <RichText className={styles.caption_title} field={item?.fields?.FeatureTitle} />
                  ) : (
                    <Heading
                      level={8}
                      className={styles.caption_title}
                      text={item?.fields?.CarouselItem?.fields?.Title}
                    />
                  )}
                </Carousel.Caption>
              </a>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default RecentBlogCarousel;
