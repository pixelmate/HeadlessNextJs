import { object as yupObject, string as yupString } from 'yup';
import { ADDRESS, EMAIL_VALIDATION, ONLY_NUMBERS, ZIP_CODE } from 'constants/validation-patterns';

export const shippingAddressSchema = yupObject().shape({
  firstName: yupString().required('MyAccountAddress_ShippingAddress_FirstNameRequired'),
  lastName: yupString().required('MyAccountAddress_ShippingAddress_LastNameRequired'),
  companyName: yupString().required('Company Name is required'),
  address: yupString()
    .required('MyAccountAddress_ShippingAddress_AddressRequired')
    .matches(ADDRESS, 'Invalid Address'),
  apartment: yupString(),
  city: yupString().required('MyAccountAddress_ShippingAddress_CityRequired'),
  zip: yupString()
    .required('MyAccountAddress_ShippingAddress_ZipRequired')
    .matches(ZIP_CODE, 'MyAccountAddress_ShippingAddress_ZipInvalidFormat'),
  state: yupString().required('MyAccountAddress_ShippingAddress_StateRequired'),
  firstNameBilling: yupString().required('MyAccountAddress_BillingAddress_FirstNameRequired'),
  lastNameBilling: yupString().required('MyAccountAddress_BillingAddress_LastNameRequired'),
  companyNameBilling: yupString().required('Company Name is required'),
  addressBilling: yupString()
    .required('MyAccountAddress_BillingAddress_AddressRequired')
    .matches(ADDRESS, 'MyAccountAddress_BillingAddress_AddressInvalidFormat'),
  apartmentBilling: yupString(),
  cityBilling: yupString().required('MyAccountAddress_BillingAddress_CityRequired'),
  zipBilling: yupString()
    .required('MyAccountAddress_BillingAddress_ZipRequired')
    .matches(ZIP_CODE, 'MyAccountAddress_BillingAddress_ZipInvalidFormat'),
  stateBilling: yupString().required('MyAccountAddress_BillingAddress_StateRequired'),
  emailBilling: yupString()
    .required('MyAccountAddress_BillingAddress_EmailRequired')
    .matches(EMAIL_VALIDATION, 'MyAccountAddress_BillingAddress_EmailInvalidFormat'),
  areaCodeBilling: yupString()
    .required('MyAccountAddress_BillingAddress_PhoneAreaCodeRequired')
    .matches(ONLY_NUMBERS, 'MyAccountAddress_BillingAddress_PhoneAreaCodeInvalidFormat'),
  phonePrefixBilling: yupString()
    .required('MyAccountAddress_BillingAddress_PhonePrefixRequired')
    .matches(ONLY_NUMBERS, 'MyAccountAddress_BillingAddress_PhonePrefixInvalidFormat'),
  phoneLineNumberBilling: yupString()
    .required('MyAccountAddress_BillingAddress_PhoneLineNumberRequired')
    .matches(ONLY_NUMBERS, 'MyAccountAddress_BillingAddress_PhoneLineNumberInvalidFormat'),
  phoneExtBilling: yupString().matches(
    ONLY_NUMBERS,
    'MyAccountAddress_BillingAddress_PhoneExtInvalidFormat'
  ),
});
