import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ShippingAddressPreviewProps = ComponentProps & {
  fields: {
    Header: Field<string>;
    Message: Field<string>;
    CcpaMessage: Field<string>;
  };
};
