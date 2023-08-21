import { ComponentProps } from 'lib/component-props';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type GiftCertificateBalanceProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
  };
};
