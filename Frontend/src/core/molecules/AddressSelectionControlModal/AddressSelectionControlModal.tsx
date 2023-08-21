import { modalAtom } from 'data/atoms/modal';
import { useTranslate } from 'hooks/useTranslate';
import { useAtom } from 'jotai';
import { Button, Col, Modal as RbModal, Row } from 'react-bootstrap';
import styles from './AddressSelectionControlModal.module.scss';
import { useState } from 'react';
import {
  AddressSelectionControlModalProps,
  CheckedVariant,
} from './AddressSelectionControlModalProps.type';

const AddressSelectionControlModal = (props: AddressSelectionControlModalProps): JSX.Element => {
  const { t } = useTranslate();
  const [, setModal] = useAtom(modalAtom);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    address,
    recommendedAddress,
    checkBoxName,
    headerTitle,
    bodyMessage,
    isAuthenticated,
    confirmAction,
  } = props;
  const [checkedVariant, setCheckedVariant] = useState<CheckedVariant>('secondary');

  const onCancel = (): void => {
    setModal(null);
  };

  const onConfirm = (): void => {
    const error = checkedVariant === '';
    setShowError(error);
    if (!error) {
      const selectedAddress = checkedVariant === 'primary' ? address : recommendedAddress;
      confirmAction(selectedAddress, isCheckboxChecked);
    }
  };

  const getAddressItemJSX = (
    title: string,
    addressValue: AddressItem,
    checkedVariantValue: CheckedVariant
  ): JSX.Element => {
    return (
      <div className="border border-info mb-3 p-3 rounded-1">
        <Row>
          <Col sm={11}>
            <h3 className="fs-4">{t(title)}</h3>
            <div className={`text-uppercase`}>
              <div className="fw-bold">{`${addressValue?.FirstName || ''} ${
                addressValue?.LastName || ''
              }`}</div>
              <div>{addressValue?.Street1}</div>
              {addressValue?.Street2 && <div>{addressValue?.Street2 || ''}</div>}
              <div>{`${addressValue?.City}, ${addressValue?.State || ''} ${
                addressValue?.Zip || ''
              }`}</div>
            </div>
          </Col>
          <Col sm={2} className={`${styles.checkbox_wrapper} position-relative`}>
            <input
              type="checkbox"
              className="position-absolute top-0"
              checked={checkedVariantValue === checkedVariant}
              onChange={() =>
                setCheckedVariant(checkedVariantValue !== checkedVariant ? checkedVariantValue : '')
              }
            />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <>
      <RbModal
        dialogClassName={styles.modal_width}
        contentClassName={styles.modal_width}
        show={true}
        centered={true}
        className={`${styles.address_selection_control_modal}`}
      >
        <RbModal.Header className={`fw-bold ${styles.header_title}`}>{headerTitle}</RbModal.Header>
        <RbModal.Body>
          <p className={`${styles.message}`}>{bodyMessage}</p>
          {showError && (
            <span className={`text-red ${styles.error_message}`}>
              {t('ShippingAddress_AddressValidation_AddressRequired')}
            </span>
          )}
          {getAddressItemJSX('ShippingAddress_AddressValidation_YouEntered', address, 'primary')}
          {getAddressItemJSX(
            'ShippingAddress_AddressValidation_Recommended',
            recommendedAddress,
            'secondary'
          )}
          {isAuthenticated && (
            <div>
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
              />
              <label className={`ms-1 ${styles.checkbox_label}`}>{t(checkBoxName)}</label>
            </div>
          )}
        </RbModal.Body>
        <RbModal.Footer className="justify-content-between">
          <Button className={`${styles.skip_button} border-1`} variant="default" onClick={onCancel}>
            {t('ShippingAddress_AddressValidation_SkipButtonText')}
          </Button>
          <Button variant="success" onClick={onConfirm}>
            {t('ShippingAddress_AddressValidation_UseButtonText')}
          </Button>
        </RbModal.Footer>
      </RbModal>
    </>
  );
};

export default AddressSelectionControlModal;
