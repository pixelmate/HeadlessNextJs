import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type GiftCertificateRegistrationProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    SubTitle: Field<string>;
  };
};
