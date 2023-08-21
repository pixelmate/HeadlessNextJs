import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type OverviewBannerProps = ComponentProps & {
  params: {
    CtaColorContrast: string;
  };
  fields: {
    RatingLogoImage: ImageField;
    RatingLogoLink: LinkField;
    Title: Field<string>;
    Description: Field<string>;
    Link: LinkField;
    Image: ImageField;
    MobileImage: ImageField;
    TrustPilotBusinessUnitId: Field<string>;
  };
};
