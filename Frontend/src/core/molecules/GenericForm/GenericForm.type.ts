import { LinkField, Item, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type GenericFormProps = ComponentProps & {
  fields: {
    ApiEndpoint: Item;
    SuccessCallback: LinkField;
    ErrorCallback: LinkField;
    Title: TextField;
  };
  params: {
    CtaAlignment: string;
  };
};
