import { useI18n } from 'next-localization';
import { ArrowIcon } from '../Icons/ArrowIcon';
import { useGiftCards } from 'hooks/useGiftCards';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const PromoCodeDetailItem = () => {
  const { t } = useI18n();
  const { deleteCardAsync, allAppliedGiftCards } = useGiftCards();
  const [deletingCodes, setDeletingCodes] = useState<string[]>([]);
  const deleteCode = (code: string) => {
    setDeletingCodes((codes) => [...codes, code]);
    deleteCardAsync(code).finally(() => {
      setDeletingCodes((codes) => codes.filter((item) => item !== code));
    });
  };
  return (
    <>
      <div>{t('PromoCode_Step2_DetailsPopup_GiftCardAddedMessage')}</div>
      {allAppliedGiftCards?.map((promoCode, index) => {
        return (
          <div key={index} className="py-1">
            <ArrowIcon className="me-1" />
            <span className="me-1">{t('Form_Generic_Tag_GiftCert')}</span>
            {promoCode?.redemptionCode}
            <div>
              <Button
                variant="link"
                onClick={() =>
                  promoCode?.paymentId !== undefined && deleteCode(promoCode.paymentId)
                }
                className={`text-decoration-underline cursor-pointer ${
                  deletingCodes.includes(promoCode?.paymentId || '') ? 'disabled' : ''
                }`}
              >
                {t('PromoCode_FieldRep_DetailsPopup_Remove')}
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PromoCodeDetailItem;
