import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ContentTileProps = ComponentProps & {
  params: {
    Variation: string;
    ColumnWidth: string;
    FeaturedContentAlignment: string;
    BackgroundColorContrast: string;
    HideColumnInMobile?: string;
  };
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    FeaturedContent: Field<string>;
    Link: LinkField;
    FeaturedContentColorContrast: ColorFields;
    TitleColorContrast: ColorFields;
    DescriptionColorContrast: ColorFields;
    CtaColorContrast: ColorFields;
    // Deprecated
    HideColumnInMobile: Field<boolean>;
  };
};
