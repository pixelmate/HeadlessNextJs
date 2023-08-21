import { MODAL } from 'constants/modal';
import { PROMOCODE } from 'constants/validation-patterns';
import TextInput from 'core/atoms/Forms/TextInput';
import PromoCodeItem from 'core/atoms/PromoCodeItem/PromoCodeItem';
import { createModal, modalAtom } from 'data/atoms/modal';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import { useGetGiftCertificateBalance } from 'data/giftCardbalance';
import { useGiftCards } from 'hooks/useGiftCards';
import { useAtom } from 'jotai';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { object as yupObject, string as yupString } from 'yup';
import PromoCodeModalClassic from './PromoCodeModalClassic';
import Placeholder from 'core/atoms/Placeholders/Placeholder';
import { formatRedemptionCode } from 'src/schemas/spending-accounts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const promoCodeSchema = (
  promoFieldValidations: string,
  codes: string[],
  codeExistLabel: string
) => {
  return yupObject().shape({
    promoCode: yupString()
      .required('Enter promocode')
      .matches(PROMOCODE, promoFieldValidations)
      .test(
        'oneOfRequired',
        codeExistLabel,
        (value) => !codes.includes(formatRedemptionCode(value))
      ),
  });
};

const PromoCodeClassic = (): JSX.Element => {
  const { t } = useI18n();
  const [, setModal] = useAtom(modalAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSpinner] = useAtom(spinnerAtom);
  const [latestAppliedInvalidCode, setLatestAppliedInvalidCode] = useState('');
  const [allInValidPromoCodes, setAllInValidPromoCodes] = useState('');
  const {
    isRefetching,
    allAppliedGiftCards,
    isApplyGiftCardLoading,
    isDeleteGiftCardLoading,
    isLoading,
    applyGiftCard,
  } = useGiftCards();
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
        setAllInValidPromoCodes('');
        return;
      }
      setLatestAppliedInvalidCode(code || '');
      setAllInValidPromoCodes(code || '');
      setIsModalOpen(false);
    },
  });

  const handleFormSubmit = (formData: { promoCode: string }) => {
    setSpinner(createSpinner('Fetching Promo Codes...'));
    mutate(formData.promoCode);
  };

  useEffect(() => {
    if (isModalOpen) {
      setModal(
        createModal(
          MODAL.COMPONENT,
          '',
          <PromoCodeModalClassic setIsModalOpen={setIsModalOpen}></PromoCodeModalClassic>
        )
      );
    }
  }, [isModalOpen]);
  const openPromoCodeDetails = () => {
    setIsModalOpen(true);
  };
  const isApplyButtonDisabled =
    isGetGiftCertificateBalanceLoading ||
    isApplyGiftCardLoading ||
    isDeleteGiftCardLoading ||
    isRefetching;

  if (isLoading) {
    return <Placeholder />;
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <>
        <Row>
          <Col md={9}>
            <TextInput
              {...register('promoCode')}
              maxLength={50}
              placeholder={t('Form_Generic_Placeholders_RedeemCouponsGiftCards')}
              error={errors?.promoCode?.message}
            />
          </Col>
          <Col md={3}>
            <Button
              type="submit"
              disabled={isApplyButtonDisabled}
              className="rounded-1 lh-sm fs-6"
              variant="success"
            >
              {t('PromoCode_Step2_Add_ApplyButtonText')}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="link"
              onClick={openPromoCodeDetails}
              className="text-decoration-none h9 mb-2 p-0"
            >
              {t('PromoCode_Step2_Add_DetailsText')}
            </Button>
          </Col>
        </Row>
        {(allAppliedGiftCards?.length > 0 || allInValidPromoCodes?.length > 0) && (
          <Row>
            <Col>
              <div className="pt-3">
                <ul className="p-0 list-unstyled">
                  <PromoCodeItem
                    allValidPromoCodes={allAppliedGiftCards}
                    allInValidPromoCodes={allInValidPromoCodes}
                    code={latestAppliedInvalidCode}
                  ></PromoCodeItem>
                </ul>
              </div>
            </Col>
          </Row>
        )}
      </>
    </form>
  );
};

export default PromoCodeClassic;
