import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type AccountAddressProps = ComponentProps & {
  fields: {
    CancelButtonCTA: LinkField;
    SaveAddressApiEndpoint: CustomFields;
    SaveButtonCTA: LinkField;
    Title: ValueField;
  };
};
export type AddressInput = {
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  firstNameBilling: string;
  lastNameBilling: string;
  companyNameBilling: string;
  addressBilling: string;
  cityBilling: string;
  stateBilling: string;
  zipBilling: string;
  areaCodeBilling: string;
  phonePrefixBilling: string;
  phoneLineNumberBilling: string;
  phoneExtBilling: string;
  emailBilling: string;
};
