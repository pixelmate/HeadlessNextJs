import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ReportsListProps = ComponentProps & {
  params: {
    BackgroundColorContrast: string;
  };
  fields: {
    Title: Field<string>;
    Label: Field<string>;
    Image: ImageField;
    PDFs: Pdf[];
  };
};
