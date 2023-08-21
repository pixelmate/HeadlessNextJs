import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ProductMediaGalleryItem = {
  id: string;
  fields: {
    Image: ImageField;
    VideoLink: {
      value: string;
    };
  };
};

export type MediaGalleryProps = ComponentProps & {
  fields: {
    MediaGallery: ProductMediaGalleryItem[];
  };
  params: {
    Variant: string;
  };
};
