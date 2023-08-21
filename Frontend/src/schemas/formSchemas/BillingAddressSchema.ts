import * as yup from 'yup';
import { ADDRESS, ZIP_CODE, NON_EMPTY_CHARACTER } from 'constants/validation-patterns';

export const billingAddressSchema = yup.object().shape({
  billingAddress: yup.object().shape({
    firstname: yup
      .string()
      .required('GiftCertificateBillingAddress_FirstNameRequired')
      .matches(NON_EMPTY_CHARACTER, 'GiftCertificateBillingAddress_FirstNameRequired'),
    lastname: yup
      .string()
      .required('GiftCertificateBillingAddress_LastNameRequired')
      .matches(NON_EMPTY_CHARACTER, 'GiftCertificateBillingAddress_LastNameRequired'),
    address: yup
      .string()
      .required('GiftCertificateBillingAddress_InvalidAddressFormat')
      .matches(ADDRESS, 'GiftCertificateBillingAddress_InvalidAddressFormat'),
    city: yup
      .string()
      .required('GiftCertificateBillingAddress_CityRequired')
      .matches(NON_EMPTY_CHARACTER, 'GiftCertificateBillingAddress_CityRequired'),
    state: yup.string().required('GiftCertificateBillingAddress_StateRequired'),
    zip: yup
      .string()
      .required('GiftCertificateBillingAddress_ZipRequired')
      .matches(ZIP_CODE, 'GiftCertificateBillingAddress_InvalidZipFormat'),
  }),
});
