import { Field, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type GenericPlaceholderProps = ComponentProps & {
  params: {
    BackgroundColorContrast: string;
  };
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Description: RichTextField;
  };
};
