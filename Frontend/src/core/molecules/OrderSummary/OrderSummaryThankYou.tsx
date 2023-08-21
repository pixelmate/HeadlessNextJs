import Placeholders from 'core/atoms/Placeholders';
import { useGetSingleOrder } from 'data/order';
import { useTranslate } from 'hooks/useTranslate';
import { OrderSummaryProps } from './OrderSummary.type';
import getFullWidth from 'utils/getFullWidth';
import PricingColumn from 'core/atoms/PricingColumn/PricingColumn';

const OrderSummaryThankYou = (props: OrderSummaryProps) => {
  const { t } = useTranslate();
  const fullWidthClass = getFullWidth(props?.params?.IsFullWidth);
  const { data, isLoading } = useGetSingleOrder();
  if (isLoading) {
    return <Placeholders />;
  }
  return (
    <>
      <div className={`${fullWidthClass} px-3`}>
        <PricingColumn
          title={t('Form_Generic_Tag_Subtotal')}
          price={(data?.subtotal?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Tax')}
          price={(data?.taxCost?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Shipping')}
          price={(data?.shippingCost?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />
        <PricingColumn
          title={t('Form_Generic_Tag_OrderTotal')}
          price={(data?.total?.toFixed(2) as string) || '0.00'}
          className="py-2"
        />
      </div>
    </>
  );
};

export default OrderSummaryThankYou;
