import { isAutoShipChecked } from 'data/atoms/autoship';
import { useAtom } from 'jotai';
import { ProductDetailPriceProps, TotalPriceProps } from './productDetailPrice.type';
import { useUserGroups } from 'data/user';
import style from './ProductDetailPrice.module.scss';
import { useI18n } from 'next-localization';
import { USER_GROUP } from 'constants/user';

const TotalPrice = ({ priceType, totalPrice }: TotalPriceProps) => {
  const { t } = useI18n();
  return (
    <>
      <div className={`${style.totalPrice} d-flex`}>
        {t('Form_Generic_Tag_YourPrice')}
        <span>${totalPrice}</span>
      </div>
      <div className={`${style.autoshipPrice} d-flex`}>{priceType}</div>
    </>
  );
};

const ProductDetailPrice = (props: ProductDetailPriceProps): JSX.Element => {
  const [autoshipChecked] = useAtom(isAutoShipChecked);
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const { t } = useI18n();
  if (groupId === USER_GROUP.AUTOSHIP) {
    return (
      <TotalPrice
        priceType={t('Products_AutoshipPricing')}
        totalPrice={props?.totalAutoshipPrice}
      />
    );
  }
  if (groupId === USER_GROUP.WHOLESALE) {
    return <TotalPrice priceType={t('Products_WholesalePricing')} totalPrice={props?.totalPrice} />;
  }
  if (groupId === USER_GROUP.EMPLOYEE) {
    return <TotalPrice priceType={t('Products_EmployeePricing')} totalPrice={props?.totalPrice} />;
  }
  if (groupId === USER_GROUP.FIELDREP || groupId === USER_GROUP.BREEDER) {
    return (
      <>
        <div className={`${style.totalPrice} d-flex`}>
          {t('Form_Generic_Tag_FieldRepPrice')}
          <span>${props?.totalPrice}</span>
        </div>
        <div className={`${style.autoshipPrice} d-flex`}>
          {t('Form_Generic_Tag_PersonalSales')}
          <span>${props?.totalPrice}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${style.totalPrice} d-flex`}>
        {t('Form_Generic_Tag_YourPrice')}
        <span>${autoshipChecked ? props?.totalAutoshipPrice : props?.totalPrice}</span>
      </div>
      {props?.autoship &&
        (autoshipChecked ? (
          <div className={`${style.autoshipPrice} d-flex`}>{t('Products_AutoshipPricing')}</div>
        ) : (
          <div className={`${style.autoshipPrice} d-flex`}>
            {t('Form_Generic_Tag_AutoshipPrice')}
            <span> ${props?.totalAutoshipPrice}</span>
          </div>
        ))}
    </>
  );
};

export default ProductDetailPrice;
