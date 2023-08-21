import { useI18n } from 'next-localization';
import { ArrowIcon } from '../Icons';
import { PromoCode } from 'src/schemas/spending-accounts';

const PromoCodeItem = ({
  allValidPromoCodes,
  allInValidPromoCodes = '',
  code = '',
}: {
  allValidPromoCodes: PromoCode[];
  allInValidPromoCodes?: string;
  code?: string;
}): JSX.Element => {
  const { t } = useI18n();

  const invalidPromoCodeString = t('PromoCode_Step2_Add_InvalidPromoCode', {
    PromoCode: code,
  });

  return (
    <>
      {allValidPromoCodes?.map((promoCode, index) => {
        const promoCodeBalanceString = t('PromoCode_Step2_Add_SuccessMessage', {
          PromoCode: promoCode.redemptionCode,
          Balance: `$${(promoCode.balance || 0).toFixed(2)}`,
        });

        return (
          <>
            <li key={index} className="h9 mb-1 ">
              <ArrowIcon />
              <span className="ms-1">{promoCodeBalanceString}</span>
            </li>
          </>
        );
      })}
      {allInValidPromoCodes !== '' && (
        <li key="invalid-promo" className="h9 mb-1">
          {invalidPromoCodeString}
        </li>
      )}
    </>
  );
};

export default PromoCodeItem;
