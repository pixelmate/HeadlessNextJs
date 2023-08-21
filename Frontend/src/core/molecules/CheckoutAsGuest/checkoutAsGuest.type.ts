import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CheckoutAsGuestProps = ComponentProps & {
  params: {
    CTAAlignment: string;
  };
  fields: {
    SubTitle: Field<string>;
    Link: LinkField;
  };
};
