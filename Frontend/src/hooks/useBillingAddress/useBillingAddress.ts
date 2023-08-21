import { modalAtom } from 'data/atoms/modal';
import { useAddShippingAddress, useAddresses, useUpdateShippingAddress } from 'data/user';
import { useValidateAddress } from 'data/validateAddress';
import useLocalStorage from 'hooks/useLocalStorage';
import { useAtom } from 'jotai';
import { useState } from 'react';
export const useBillingAddress = () => {
  const { isAuthenticated } = useAddresses({
    onSettled: (data) => {
      if (data && isAuthenticated) {
        const tempBillingAddress = data?.Items?.find((item: AddressItem) => item.Billing === true);
        setBillingAddress(tempBillingAddress);
        setLocalStorageBillingAddress(tempBillingAddress);
      }
      if (!isAuthenticated) {
        const notAuthUserAddress = localStorageBillingAddress;
        setBillingAddress(notAuthUserAddress?.ID ? undefined : notAuthUserAddress);
      }
    },
  });
  const [, setModal] = useAtom(modalAtom);
  const [holdBillingAddress, setHoldBillingAddress] = useState<AddressItem>();
  const { mutate: update } = useUpdateShippingAddress({
    onSuccess: (data) => {
      applyChanges(data?.status);
    },
  });
  const { mutate: add } = useAddShippingAddress({
    onSuccess: (data) => {
      applyChanges(data?.status);
    },
  });
  const { mutate: validateEasyPost } = useValidateAddress({
    onSuccess: undefined,
    onSettled: (data) => {
      if (tmpAddress) {
        if (!!data && data.StatusCode === '200' && data.Data.Success) {
          const newAddress = {
            ...tmpAddress,
            ...data.Data,
          };
          updateBillingAddress(newAddress);
        } else {
          updateBillingAddress(tmpAddress);
        }
      }
    },
  });
  const [billingAddress, setBillingAddress] = useState<AddressItem | undefined>(undefined);
  const [localStorageBillingAddress, setLocalStorageBillingAddress] = useLocalStorage<
    AddressItem | undefined
  >('BILLING_ADDRESS');

  const [tmpAddress, setTmpAddress] = useState<AddressItem>();

  function validateShippingAddress(formRawValues: ShippingAddressForm) {
    const newAddress = getMappedAddress(formRawValues);
    setTmpAddress(newAddress);
    validateEasyPost(getMappedAddressEasyPost(formRawValues));
  }

  function updateBillingAddress(newAddress: AddressItem) {
    if (isAuthenticated) {
      setHoldBillingAddress({ ...billingAddress, ...newAddress });
      if (billingAddress && billingAddress.ID) {
        update({ id: billingAddress.ID, body: newAddress });
      } else {
        add(newAddress);
      }
    } else {
      setLocalStorageBillingAddress(newAddress);
      setBillingAddress(newAddress);
      setModal(null);
    }
  }

  function getMappedAddress(formRawValues: ShippingAddressForm): Partial<AddressItem> {
    const { firstName, lastName, address, apartment, city, state, zip, phone, email } =
      formRawValues;
    return {
      FirstName: firstName,
      LastName: lastName,
      Street1: address,
      Street2: apartment,
      City: city,
      State: state,
      Zip: zip,
      Country: 'US',
      Shipping: true,
      Phone: phone,
      Email: email,
    };
  }

  function getMappedAddressEasyPost(formRawValues: ShippingAddressForm): ValidateAddressBody {
    const { address, city, state, zip, apartment } = formRawValues;
    return {
      street1: address,
      street2: apartment || '',
      city: city,
      state: state,
      zip: zip,
    };
  }

  function applyChanges(status: number | undefined): void {
    if (status === 200 && holdBillingAddress) {
      setBillingAddress(holdBillingAddress);
      setLocalStorageBillingAddress(holdBillingAddress);
      setModal(null);
    }
  }

  return { billingAddress, validateShippingAddress };
};
