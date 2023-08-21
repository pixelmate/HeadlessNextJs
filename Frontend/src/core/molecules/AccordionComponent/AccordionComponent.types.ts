import { RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type AccordionProps = ComponentProps & {
  fields: {
    Title: ValueField;
    AccordionItems: {
      id: string;
      fields: {
        Title: ValueField;
        Description: RichTextField;
      };
    }[];
  };
};
