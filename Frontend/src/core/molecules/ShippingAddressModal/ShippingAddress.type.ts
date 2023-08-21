import { Dispatch, SetStateAction } from 'react';

export interface ShippingAddressProps {
  confirmButtonName: string;
  shippingAddress?: AddressItem;
  setRecommendedAddress: Dispatch<SetStateAction<AddressItem | undefined>>;
  setHoldShippingAddress: Dispatch<SetStateAction<AddressItem | undefined>>;
}
