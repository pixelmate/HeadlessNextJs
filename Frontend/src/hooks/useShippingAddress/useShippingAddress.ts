import { CALIFORNIA_ABBREVIATION_CODE } from 'constants/address';
import { modalAtom } from 'data/atoms/modal';
import { useAddShippingAddress, useAddresses, useUpdateShippingAddress } from 'data/user';
import useLocalStorage from 'hooks/useLocalStorage';
import { useAtom } from 'jotai';
import { useState } from 'react';
export const useShippingAddress = () => {
  const { isAuthenticated } = useAddresses({
    onSettled: (data) => {
      if (data && isAuthenticated) {
        const tmpShippingAddress = data?.Items?.find((item: AddressItem) => item.Shipping === true);
        setShippingAddress(tmpShippingAddress);
        setLocalStorageShippingAddress(tmpShippingAddress);
      }
      if (!isAuthenticated) {
        const notAuthUserAddress = localStorageShippingAddress;
        setShippingAddress(notAuthUserAddress?.ID ? undefined : notAuthUserAddress);
      }
    },
  });
  const [, setModal] = useAtom(modalAtom);
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

  const [shippingAddress, setShippingAddress] = useState<AddressItem | undefined>(undefined);
  const [recommendedAddress, setRecommendedAddress] = useState<AddressItem | undefined>(undefined);
  const [holdShippingAddress, setHoldShippingAddress] = useState<AddressItem>();
  const [selectedAddress, setSelectedAddress] = useState<AddressItem>();
  const [isCaState, setIsCaState] = useState(false);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [localStorageShippingAddress, setLocalStorageShippingAddress] = useLocalStorage<
    AddressItem | undefined
  >('SHIPPING_ADDRESS');

  function selectAddress(newAddressValues: AddressItem, needUpdate = false) {
    const newAddress = { ...shippingAddress, ...newAddressValues };
    setNeedUpdate(needUpdate);
    updateSelectedAddressData(newAddress);
    setModal(null);
  }

  function updateShippingAddress(): void {
    if (selectedAddress) {
      if (needUpdate && isAuthenticated) {
        if (shippingAddress && shippingAddress.ID) {
          update({ id: shippingAddress.ID, body: selectedAddress });
        } else {
          add(selectedAddress);
        }
      } else {
        applyChanges(200);
      }
    }
  }

  function applyChanges(status: number | undefined): void {
    if (status === 200 && selectedAddress) {
      setShippingAddress(selectedAddress);
      setLocalStorageShippingAddress(selectedAddress);
      setModal(null);
      resetTmpValues();
    }
  }

  function updateSelectedAddressData(address: AddressItem): void {
    let xpData: XP_AddressItem | undefined = isAuthenticated ? address.xp : undefined;
    if (
      address?.State?.toLocaleLowerCase() === CALIFORNIA_ABBREVIATION_CODE &&
      ((isAuthenticated && !address?.xp?.CCPANoticeView) || !isAuthenticated)
    ) {
      xpData = {
        CCPANoticeView: true,
        CCPANoticeViewDate: new Date().toISOString(),
      };
      setIsCaState(true);
    }
    setSelectedAddress({ ...address, xp: xpData });
  }

  function resetTmpValues(): void {
    setIsCaState(false);
    setRecommendedAddress(undefined);
    setHoldShippingAddress(undefined);
    setNeedUpdate(false);
    setSelectedAddress(undefined);
  }

  return {
    shippingAddress,
    holdShippingAddress,
    recommendedAddress,
    isAuthenticated,
    isCaState,
    selectedAddress,
    updateShippingAddress,
    setRecommendedAddress,
    setHoldShippingAddress,
    selectAddress,
  };
};
