import Placeholders from 'core/atoms/Placeholders';
import { useOrderSummary } from 'data/order';
import { useTranslate } from 'hooks/useTranslate';
import styles from './OrderSummary.module.scss';
import { OrderSummaryProps } from './OrderSummary.type';
import PricingColumn from 'core/atoms/PricingColumn/PricingColumn';
import getFullWidth from 'utils/getFullWidth';

const OrderSummaryCheckout = (props: OrderSummaryProps) => {
  const { t } = useTranslate();
  const fullWidthClass = getFullWidth(props?.params?.IsFullWidth);

  const { cart, isLoading } = useOrderSummary();
  if (isLoading) {
    return <Placeholders />;
  }
  return (
    <>
      <div className={`${fullWidthClass} px-3`}>
        <PricingColumn
          title={t('Form_Generic_Tag_TotalRetail')}
          price={cart?.total?.toFixed(2) as string}
          className="py-2"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_RetailSavings')}
          price={cart?.retailSavings?.toFixed(2) as string}
          className={`${styles.orderSummary_bg_saving_info} py-2 fw-bold`}
          invertNum={true}
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Subtotal')}
          price={(cart?.subtotal?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Tax')}
          price={(cart?.taxCost?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Shipping')}
          price={(cart?.shippingCost?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_GiftCards')}
          price={cart?.giftCards?.toFixed(2) || '0.00'}
          className="py-2"
          invertNum={true}
        />

        <PricingColumn
          title={t('Form_Generic_Tag_OrderTotal')}
          price={(cart?.orderTotal?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />
      </div>
    </>
  );
};

export default OrderSummaryCheckout;
