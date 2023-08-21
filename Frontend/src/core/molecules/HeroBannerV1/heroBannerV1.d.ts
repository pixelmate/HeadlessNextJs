import { Field, ImageField, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type HeroBannerV1Props = ComponentProps & {
  params: {
    ContentColorContrast: string;
    PlaceholderAlignment: string;
    Variation: string;
    TextAlignment: string;
  };
  fields: {
    HeroBannerTitle: Field<string>;
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    MobileImage: ImageField;
    Link: LinkFieldValue;
  };
};
