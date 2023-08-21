import { LinkField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type NavigationStripData = ComponentProps & {
  fields: {
    Message: {
      value: string;
    };
    ContactNumber: ContactNumberType[];
    DetailedMessage: RichTextField;
  };
};

export type ContactNumberType = {
  fields: {
    Link: LinkField;
  };
};
