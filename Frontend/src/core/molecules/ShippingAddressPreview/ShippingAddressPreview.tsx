import { Button } from 'react-bootstrap';
import styles from './ShippingAddressPreview.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { createModal, modalAtom } from 'data/atoms/modal';
import { MODAL } from 'constants/modal';
import ShippingAddressModal from 'core/molecules/ShippingAddressModal/ShippingAddressModal';
import { useShippingAddress } from 'hooks/useShippingAddress/useShippingAddress';
import AddressSelectionControlModal from '../AddressSelectionControlModal/AddressSelectionControlModal';
import { ShippingAddressPreviewProps } from './ShippingAddressPreview.type';
import CcpaModal from '../CcpaModal/CcpaModal';

const ShippingAddressPreview = (props: ShippingAddressPreviewProps): JSX.Element => {
  const [, setModal] = useAtom(modalAtom);
  const { t } = useTranslate();
  const { Header: headerTitle, Message: bodyMessage, CcpaMessage } = props.fields;
  const {
    shippingAddress,
    holdShippingAddress,
    recommendedAddress,
    isAuthenticated,
    isCaState,
    selectedAddress,
    updateShippingAddress,
    selectAddress,
    setRecommendedAddress,
    setHoldShippingAddress,
  } = useShippingAddress();
  const [actionButtonName, setActionButtonName] = useState(
    'ShippingAddress_Preview_EnterNewAddress'
  );
  const [shippingFormConfirmButton, setConfirmButton] = useState(
    'ShippingAddress_AddUpdate_AddAddress'
  );
  useEffect(() => {
    if (checkIsShippingAddress()) {
      setActionButtonName('ShippingAddress_Preview_Change');
      setConfirmButton('ShippingAddress_AddUpdate_UpdateButtonText');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddress]);

  useEffect(() => {
    if (selectedAddress) {
      if (isCaState) {
        setModal(
          createModal(
            MODAL.COMPONENT,
            '',
            <CcpaModal
              onConfirmAction={updateShippingAddress}
              ccpaMessage={CcpaMessage}
            ></CcpaModal>
          )
        );
      } else {
        updateShippingAddress();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress]);

  useEffect(() => {
    if (recommendedAddress && holdShippingAddress) {
      setModal(
        createModal(
          MODAL.COMPONENT,
          '',
          <AddressSelectionControlModal
            address={holdShippingAddress}
            recommendedAddress={recommendedAddress}
            checkBoxName="ShippingAddress_AddressValidation_CheckboxText"
            bodyMessage={bodyMessage.value}
            headerTitle={headerTitle.value}
            isAuthenticated={isAuthenticated}
            confirmAction={selectAddress}
          ></AddressSelectionControlModal>
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendedAddress]);

  const openModal = (): void => {
    setModal(
      createModal(
        MODAL.COMPONENT,
        '',
        <ShippingAddressModal
          confirmButtonName={shippingFormConfirmButton}
          shippingAddress={shippingAddress}
          setRecommendedAddress={setRecommendedAddress}
          setHoldShippingAddress={setHoldShippingAddress}
        ></ShippingAddressModal>
      )
    );
  };

  function checkIsShippingAddress(): boolean {
    return !!shippingAddress && Object.keys(shippingAddress).length > 0;
  }

  return (
    <>
      <Button
        type="button"
        className={`btn btn-link text-decoration-none p-0 ${styles.btn_link}`}
        variant="link"
        onClick={openModal}
      >
        {t(actionButtonName)}
      </Button>
      {checkIsShippingAddress() && (
        <div className={`pt-1 ps-2 text-uppercase`}>
          <div>{`${shippingAddress?.FirstName || ''} ${shippingAddress?.LastName || ''}`}</div>
          <div>{shippingAddress?.Street1 || ''}</div>
          {shippingAddress?.Street2 && <div>{shippingAddress?.Street2 || ''}</div>}
          <div>{`${shippingAddress?.City || ''}, ${shippingAddress?.State || ''} ${
            shippingAddress?.Zip || ''
          }`}</div>
        </div>
      )}
    </>
  );
};
export default ShippingAddressPreview;
