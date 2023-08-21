import Image from 'core/atoms/Image';
import { ProductMediaGalleryItem } from './productDetail.types';
import { useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import style from './MediaGallery.module.scss';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const MediaGalleryClassic = (props: { galleryItems: ProductMediaGalleryItem[] }): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Col xs={12} lg={6} className={style.mediaGallery}>
      <Row className="h-100">
        <Col
          xs={12}
          xl={2}
          className={`order-1 order-xl-0 align-items-center d-flex d-xl-block ${style.thumbnailWrapper}`}
        >
          {props?.galleryItems?.map((media: ProductMediaGalleryItem, index: number) =>
            media?.fields?.Image?.value?.src ? (
              <div
                key={media?.id}
                onClick={() => setSelectedIndex(index)}
                className={style.thumbnail}
              >
                <Image field={media?.fields?.Image} className="d-block img-fill h-100" />
              </div>
            ) : (
              <div
                key={media?.id}
                onClick={() => setSelectedIndex(index)}
                className={style.thumbnail_video}
              >
                <div className={style.playerWrapper}>
                  <ReactPlayer
                    url={media?.fields?.VideoLink?.value}
                    light={true}
                    className={`${style.reactPlayer} w-100 h-100`}
                    playing={false}
                  />
                </div>
              </div>
            )
          )}
        </Col>
        <Col xs={12} xl={10}>
          <Carousel
            fade
            activeIndex={selectedIndex}
            interval={null}
            indicators={false}
            controls={false}
            className={`mb-3 ${style.carousel}`}
          >
            {props?.galleryItems?.map((media: ProductMediaGalleryItem) => (
              <Carousel.Item key={media?.id} className="h-100 bg-white">
                {media?.fields?.Image?.value?.src ? (
                  <Image field={media?.fields?.Image} className="d-block h-auto w-100 mx-auto" />
                ) : (
                  <div className={style.carousel_playerWrapper}>
                    <ReactPlayer
                      controls={true}
                      url={media?.fields?.VideoLink?.value}
                      className={`${style.reactPlayer} w-100 h-100`}
                    />
                  </div>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Col>
  );
};

export default MediaGalleryClassic;
