import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type BannerProps = ComponentProps & {
  params: {
    BackgroundColorContrast: string;
    CtaColorContrast: string;
  };
  fields: {
    BannerTitle: Field<string>;
    Title: Field<string>;
    Description: Field<string>;
    Link: LinkField;
    Image: ImageField;
  };
};
