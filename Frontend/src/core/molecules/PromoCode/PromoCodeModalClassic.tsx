import PromoCodeDetailItem from 'core/atoms/PromoCodeDetailItem/PromoCodeDetailItem';
import { modalAtom } from 'data/atoms/modal';
import { useOrderSummary } from 'data/order';
import { useGiftCards } from 'hooks/useGiftCards';
import { useAtom } from 'jotai';
import { useI18n } from 'next-localization';
import { Button, Modal as RbModal } from 'react-bootstrap';

interface PromoCodeModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoCodeModal = ({ setIsModalOpen }: PromoCodeModalProps): JSX.Element => {
  const { t } = useI18n();
  const [, setModal] = useAtom(modalAtom);
  const { cart } = useOrderSummary();
  const onClose = (): void => {
    setModal(null);
    setIsModalOpen(false);
  };
  const { allAppliedGiftCards } = useGiftCards();
  return (
    <>
      <RbModal show={true} centered={true}>
        <RbModal.Header className="fw-bold">
          {t('PromoCode_Step2_DetailsPopup_Header')}
        </RbModal.Header>

        <RbModal.Body>
          {allAppliedGiftCards?.length === 0 ? (
            <p>{t('PromoCode_Step2_DetailsPopup_NoGiftCardMessage')}</p>
          ) : (
            <>
              <PromoCodeDetailItem></PromoCodeDetailItem>

              <div>
                <strong className="me-1">{t('Form_Generic_Tag_PleaseNote')}</strong>
                {t('PromoCode_Step2_DetailsPopup_NoteText')}
              </div>
              <p className="my-5">
                {t('PromoCode_Step2_DetailsPopup_AdjustedTotal')}
                <strong>${Number(cart.orderTotal || 0).toFixed(2)}</strong>
              </p>
            </>
          )}
        </RbModal.Body>
        <RbModal.Footer className="justify-content-between">
          <Button onClick={onClose} className="btn btn-secondary">
            {t('PromoCode_Step2_DetailsPopup_CloseButtonText')}
          </Button>
        </RbModal.Footer>
      </RbModal>
    </>
  );
};

export default PromoCodeModal;
