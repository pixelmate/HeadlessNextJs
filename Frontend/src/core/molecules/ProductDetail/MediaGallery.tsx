import dynamic from 'next/dynamic';
import { memo } from 'react';
import { NextComponentType } from 'next';
import { ProductMediaGalleryItem } from './productDetail.types';

const MediaGalleryClassic = dynamic(() => import('./MediaGalleryClassic'));
const MediaGalleryModern = dynamic(() => import('./MediaGalleryModern'));

const MAP_THEME_TO_MEDIAGALLERY: Record<string, NextComponentType> = {
  classic: MediaGalleryClassic,
  modern: MediaGalleryModern,
};

const MediaGallery = (props: {
  galleryItems: ProductMediaGalleryItem[];
  variation: string;
}): JSX.Element => {
  const Component = props?.variation
    ? MAP_THEME_TO_MEDIAGALLERY[props?.variation]
    : MediaGalleryModern;

  return <Component galleryItems={props.galleryItems} />;
};

export default memo(MediaGallery);
