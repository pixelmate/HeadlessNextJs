import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CarouselItems = {
  url: string;
  fields: {
    CarouselItem: {
      fields: {
        Title: Field<string>;
        Image: ImageField;
        MobileImage: ImageField;
      };
    };
    FeatureTitle: Field<string>;
  };
};

export type RecentBlogCarouselProps = ComponentProps & {
  fields: {
    CarouselItems: CarouselItems[];
    Title: {
      value: string;
    };
  };
};
