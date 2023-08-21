import { useTranslate } from 'hooks/useTranslate';
import { Button, Modal as RbModal } from 'react-bootstrap';
import styles from './CancelOrderModal.module.scss';
import { modalAtom } from 'data/atoms/modal';
import { useAtom } from 'jotai';
import { useCancelFailedOrder } from 'hooks/useCancelFailedOrder/useCancelFailedOrder';
import { CancelOrderModalProps } from './CancelOrderModal.type';
import { OrderCloudError } from 'ordercloud-javascript-sdk';

const CancelOrderModal = ({ id }: CancelOrderModalProps): JSX.Element => {
  const [, setModal] = useAtom(modalAtom);
  const { t } = useTranslate();
  const { mutate: cancelOrder } = useCancelFailedOrder({
    onSuccess: (data: Order | OrderCloudError) => {
      if (!data?.status && (data as Order)?.id) {
        setModal(null);
      } else {
        console.log('Cancel Order Error');
      }
    },
  });

  const onCancel = () => {
    setModal(null);
  };
  const onConfirm = () => {
    cancelOrder({ id });
  };

  return (
    <>
      <RbModal size="sm" show={true} centered={true}>
        <RbModal.Body className="text-center">
          <p className="mb-1">{t('CancelOrderConfirm_ConfirmMessage')}</p>
          <Button variant="danger" onClick={onConfirm} className="me-2">
            {t('CancelOrderConfirm_CancelOrderButton')}
          </Button>
          <Button
            variant="default"
            onClick={onCancel}
            className={`${styles.cancel_button} border-1`}
          >
            {t('CancelOrderConfirm_CancelButton')}
          </Button>
        </RbModal.Body>
      </RbModal>
    </>
  );
};

export default CancelOrderModal;
