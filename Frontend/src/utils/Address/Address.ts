import { DEFAULT_COUNTRY } from 'constants/address';

export function getMappedShippingAddress(
  formRawValues: ShippingAddressForm,
  country?: string
): Partial<AddressItem> {
  const { firstName, lastName, address, apartment, city, state, zip } = formRawValues;
  return {
    FirstName: firstName,
    LastName: lastName,
    Street1: address,
    Street2: apartment,
    City: city,
    State: state,
    Zip: zip,
    Country: country || DEFAULT_COUNTRY,
    Shipping: true,
  };
}

export function getMappedAddressEasyPost(formRawValues: ShippingAddressForm): ValidateAddressBody {
  const { address, city, state, zip, apartment } = formRawValues;
  return {
    street1: address,
    street2: apartment || '',
    city: city,
    state: state,
    zip: zip,
  };
}

export function getMappedValidationErrorsMessage(errors: ValidateAddressErrors[]) {
  return errors.map((errorItem) => {
    return errorItem.Message;
  });
}
