import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTranslate } from 'hooks/useTranslate';
import { Button, Modal as RbModal } from 'react-bootstrap';
import styles from './CcpaModal.module.scss';
import { CcpaModalProps } from './CcpaModal.type';

const CcpaModal = (props: CcpaModalProps) => {
  const { ccpaMessage, onConfirmAction } = props;
  const { t } = useTranslate();
  const onConfirm = () => {
    onConfirmAction();
  };
  return (
    <RbModal
      size="lg"
      show={true}
      centered={true}
      dialogClassName={styles.modal_width}
      contentClassName={styles.modal_width}
      className={`${styles.ccpa_modal_container}`}
    >
      <RbModal.Header>{t('ShippingAddress_Ccpa_HeaderText')}</RbModal.Header>
      <RbModal.Body>
        <RichText field={ccpaMessage} />
      </RbModal.Body>
      <RbModal.Footer className="d-flex justify-content-center">
        <Button variant="success" onClick={onConfirm}>
          {t('ShippingAddress_Ccpa_Ok')}
        </Button>
      </RbModal.Footer>
    </RbModal>
  );
};

export default CcpaModal;
