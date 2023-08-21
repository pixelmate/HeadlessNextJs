import { ComponentProps } from 'lib/component-props';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type GiftCertificateBillingAddressProps = ComponentProps & {
  fields: {
    States: State[];
  };
};

type State = {
  fields: {
    Name: Field<string>;
  };
};
