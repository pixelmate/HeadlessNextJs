import { ComponentProps } from 'lib/component-props';
import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type OrderSummaryProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    CheckoutCTA: LinkField;
  };
  params: {
    Variation: string;
    IsFullWidth: string;
  };
};
