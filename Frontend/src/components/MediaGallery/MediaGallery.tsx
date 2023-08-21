import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { MediaGalleryProps } from 'core/molecules/MediaGallery/mediaGallery.type';
import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';

const MediaGalleryClassic = dynamic(
  () => import('../../core/molecules/MediaGallery/MediaGalleryClassic'),
  { ssr: false }
);
const MediaGalleryModern = dynamic(
  () => import('../../core/molecules/MediaGallery/MediaGalleryModern'),
  { ssr: false }
);

const MAP_THEME_TO_MEDIAGALLERY: Record<string, NextComponentType> = {
  Classic: MediaGalleryClassic,
  Modern: MediaGalleryModern,
};

const MediaGallery = (props: MediaGalleryProps): JSX.Element => {
  const Component = props?.params?.Variant
    ? MAP_THEME_TO_MEDIAGALLERY[props?.params?.Variant]
    : MediaGalleryModern;

  return <Component {...props} />;
};

export default withDatasourceCheck()<MediaGalleryProps>(MediaGallery);
