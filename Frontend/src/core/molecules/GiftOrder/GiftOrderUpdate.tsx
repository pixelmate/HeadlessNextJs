import { useI18n } from 'next-localization';
import type { GiftOrderProps } from './GiftOrder.type';
import { Button, Modal, Stack } from 'react-bootstrap';
import { useState } from 'react';
import styles from './GiftOrderUpdate.module.scss';
import { useGiftOrder } from 'hooks/checkout/useGiftOrder';
import { MAX_GIFT_ORDER_MESSAGE_LENGTH } from 'constants/giftOrder';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import { Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import GroupTile from 'core/atoms/GroupTile';

const GiftOrderUpdate = (props: DeepPartial<GiftOrderProps>) => {
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();
  const { Title } = props.fields || {};
  const [show, setShow] = useState(false);
  const {
    setGiftOrderMessage,
    setIsGiftOrder,
    saveDraftToLocalStorage,
    value,
    draftValue,
    draftMessageLettersLeft,
  } = useGiftOrder();
  const { isGiftOrder: draftIsGiftOrder, giftOrderMessage: draftGiftOrderMessage } = draftValue;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleUpdate = () => {
    saveDraftToLocalStorage();
    handleClose();
  };

  const details = value.isGiftOrder
    ? t('GiftOrder_Message', { Message: value.giftOrderMessage })
    : t('GiftOrder_NotAGift');

  const editingStyle = sitecoreContext.pageEditing ? { marginTop: '50vh' } : {};

  return (
    <>
      <GroupTile
        heading={Title?.value as string}
        btnLabel={t('GiftOrder_ChangeCTA')}
        handleBtn={handleShow}
      >
        {details}
      </GroupTile>
      <Modal
        className={styles.modal}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={editingStyle}
      >
        <Modal.Header>
          <h4 className={styles.title}>
            <Text field={Title} />
          </h4>
        </Modal.Header>
        <Modal.Body>
          <label>
            <Stack direction="horizontal" gap={2} className="align-items-stretch">
              <FormCheckInput
                type="checkbox"
                checked={draftIsGiftOrder}
                onChange={(e) => setIsGiftOrder(e.target.checked, true)}
              />
              <span>{t('GiftOrder_IsAGiftCheckbox')}</span>
            </Stack>
          </label>
          <div className={styles.container} hidden={!draftIsGiftOrder}>
            <div className={styles.body}>
              <textarea
                className="form-control"
                onChange={(e) => setGiftOrderMessage(e.target.value, true)}
                value={draftGiftOrderMessage}
                maxLength={MAX_GIFT_ORDER_MESSAGE_LENGTH}
                rows={4}
                cols={40}
                style={{ resize: 'none' }}
              />
              <div>
                {t('GiftOrder_CharacterLimit', { Characters_Left: draftMessageLettersLeft })}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="light" onClick={handleClose}>
            {t('GiftOrder_Cancel')}
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            {t('GiftOrder_Update')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GiftOrderUpdate;
