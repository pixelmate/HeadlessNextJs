import { ComponentProps } from 'lib/component-props';
import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type PanelProps = ComponentProps & {
  params: {
    BackgroundColorContrast: string;
    TitleAlignment: string;
    Variation: string;
    IsFullHeight: string;
    IsFullWidth: string;
  };
  fields: {
    Title: Field<string>;
    Image: ImageField;
    IsFieldRepOnly: Field<boolean>;
    HideOnEmptyCart: Field<boolean>;
    HideWhenAuth: Field<boolean>;
  };
};
