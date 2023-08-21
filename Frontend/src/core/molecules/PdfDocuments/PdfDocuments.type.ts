import { ComponentProps } from 'lib/component-props';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type PdfDocumentsProps = ComponentProps & {
  fields: {
    PdfIcon: ImageField;
    Pdfs: Pdf[];
  };
};
