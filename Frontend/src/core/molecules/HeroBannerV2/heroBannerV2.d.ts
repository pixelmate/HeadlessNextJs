import { Item, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type IconField = {
  Icon: {
    value: {
      src: string;
      alt: string;
    };
  };
  Text: {
    value: string;
  };
};

export type IconsField = Item & {
  id: string;
  url: string;
  fields: IconField;
};

export type HeroBannerV2Props = ComponentProps & {
  params: {
    Variation: string;
    TextAlignment: string;
    SubTitleColorContrast?: string;
    FeaturedIconsFontColor?: string;
    BackgroundColorContrast: string;
  };
  fields: {
    FeaturedIcons?: IconsField[];
    Title: Field<string>;
    SubTitle: Field<string>;
    Image: ImageField;
    MobileImage: ImageField;
  };
};
