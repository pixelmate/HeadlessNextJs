import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import PromoCodeDetailItem from 'core/atoms/PromoCodeDetailItem/PromoCodeDetailItem';
import { useOrderSummary } from 'data/order';
import { useGiftCards } from 'hooks/useGiftCards';
import { useI18n } from 'next-localization';
import { Button, Modal as RbModal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { PROMOCODE } from 'constants/validation-patterns';
import TextInput from 'core/atoms/Forms/TextInput';
import { formatRedemptionCode } from 'src/schemas/spending-accounts';
import { useGetGiftCertificateBalance } from 'data/giftCardbalance';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import { useAtom } from 'jotai';

interface PromoCodeModalModernProps {
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  invalidCode: string;
  setInvalidCode: (value: string) => void;
}

const promoCodeSchema = (
  promoFieldValidations: string,
  codes: string[],
  codeExistLabel: string
) => {
  return object().shape({
    promoCode: string()
      .required('Enter promocode')
      .matches(PROMOCODE, promoFieldValidations)
      .test(
        'oneOfRequired',
        codeExistLabel,
        (value) => !codes.includes(formatRedemptionCode(value))
      ),
  });
};

const PromoCodeModalModern = ({
  setIsModalOpen,
  isOpen,
  invalidCode,
  setInvalidCode,
}: PromoCodeModalModernProps): JSX.Element => {
  const { t } = useI18n();
  const { cart } = useOrderSummary();
  const onClose = (): void => {
    setIsModalOpen(false);
  };

  const [, setSpinner] = useAtom(spinnerAtom);
  const {
    isRefetching,
    allAppliedGiftCards,
    isApplyGiftCardLoading,
    isDeleteGiftCardLoading,
    applyGiftCard,
  } = useGiftCards({
    getAppliedGiftCardsOnSuccess() {
      onClose();
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ promoCode: string | number }>({
    resolver: yupResolver(
      promoCodeSchema(
        t('Form_Generic_ValidationMessages_CouponGiftCertificateRange'),
        allAppliedGiftCards?.map((item) => item?.redemptionCode) || [],
        'Gift Card/Promo code already applied'
      )
    ),
  });
  const { mutate, isLoading: isGetGiftCertificateBalanceLoading } = useGetGiftCertificateBalance({
    onSuccess: (data, code) => {
      if (data?.Balance !== null) {
        applyGiftCard(data as GiftCertificateBalance);
        setSpinner(createSpinner('Applying Promo Codes...'));
        return;
      }
      setInvalidCode(code || '');
    },
  });

  const handleFormSubmit = (formData: { promoCode: string }) => {
    setSpinner(createSpinner('Fetching Promo Codes...'));
    mutate(formData.promoCode);
  };

  const isApplyButtonDisabled =
    isGetGiftCertificateBalanceLoading ||
    isApplyGiftCardLoading ||
    isDeleteGiftCardLoading ||
    isRefetching;
  return (
    <>
      <RbModal show={isOpen} centered={true}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <RbModal.Header className="fw-bold" closeButton onHide={onClose}>
            {t('PromoCode_Step3_Add_Header')}
          </RbModal.Header>

          <RbModal.Body>
            <TextInput
              {...register('promoCode')}
              maxLength={50}
              placeholder={t('Form_Generic_Placeholders_RedeemCouponsGiftCards')}
              error={errors?.promoCode?.message}
            />
            {allAppliedGiftCards?.length > 0 && (
              <>
                <PromoCodeDetailItem></PromoCodeDetailItem>

                <div>
                  <strong className="me-1">{t('Form_Generic_Tag_PleaseNote')}</strong>
                  {t('PromoCode_Step2_DetailsPopup_NoteText')}
                </div>
                <p className="my-5">
                  {t('PromoCode_Step3_DetailsPopup_AdjustedTotal')}
                  <strong>${Number(cart.orderTotal || 0).toFixed(2)}</strong>
                </p>
              </>
            )}
            {invalidCode !== '' && (
              <>
                {t('PromoCode_Step3_DetailsPopup_InvalidPromoCode', {
                  PromoCode: invalidCode,
                })}
              </>
            )}
          </RbModal.Body>
          <RbModal.Footer className="justify-content-between">
            <Button
              disabled={isApplyButtonDisabled}
              onClick={onClose}
              className="btn btn-secondary"
            >
              {t('PromoCode_Step3_DetailsPopup_CloseButtonText')}
            </Button>
            <Button type="submit" disabled={isApplyButtonDisabled} className="btn btn-success">
              {t('PromoCode_Step3_DetailsPopup_ApplyButtonText')}
            </Button>
          </RbModal.Footer>
        </form>
      </RbModal>
    </>
  );
};

export default PromoCodeModalModern;
