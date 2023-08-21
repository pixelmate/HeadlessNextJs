import { DEFAULT_COUNTRY } from 'constants/address';
import { formatPhoneNumber } from 'utils/formatPhoneNumber';

interface ShippingBillingAddressMap {
  formData: AddressUpdateForm;
  address?: Partial<AddressItem>;
}

export const mapShippingAddress = ({
  formData,
  address,
}: ShippingBillingAddressMap): AddressItem => ({
  ID: address?.ID,
  Shipping: address?.Shipping,
  Billing: address?.Billing,
  CompanyName: formData?.companyName,
  FirstName: formData?.firstName,
  LastName: formData?.lastName,
  Street1: formData?.address,
  Street2: formData?.apartment,
  City: formData?.city,
  State: formData?.state,
  Zip: formData?.zip,
  Country: DEFAULT_COUNTRY,
  Phone: '',
  AddressName: address?.AddressName || '',
});

export const mapBillingAddress = ({
  formData,
  address,
}: ShippingBillingAddressMap): AddressItem => ({
  Shipping: address?.Shipping,
  Billing: address?.Billing,
  CompanyName: formData?.companyNameBilling,
  FirstName: formData?.firstNameBilling,
  LastName: formData?.lastNameBilling,
  Street1: formData?.addressBilling,
  Street2: formData?.apartmentBilling,
  City: formData?.cityBilling,
  State: formData?.stateBilling,
  Zip: formData?.zipBilling,
  Country: DEFAULT_COUNTRY,
  Phone: formatPhoneNumber(
    formData,
    'areaCodeBilling',
    'phonePrefixBilling',
    'phoneLineNumberBilling',
    'phoneExtBilling'
  ),
  AddressName: address?.AddressName || '',
  xp: {
    Email: formData?.emailBilling,
  },
});
