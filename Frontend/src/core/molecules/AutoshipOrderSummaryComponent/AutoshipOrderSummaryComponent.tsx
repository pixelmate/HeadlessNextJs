import Placeholders from 'core/atoms/Placeholders';
import { useTranslate } from 'hooks/useTranslate';
import { AutoshipOrderSummaryProps } from './AutoshipOrderSummaryComponent.type';
import getFullWidth from 'utils/getFullWidth';
import { useAutoshipOrderSummary } from 'data/order';
import PricingColumn from 'core/atoms/PricingColumn/PricingColumn';

const AutoshipOrderSummaryComponent = (props: AutoshipOrderSummaryProps) => {
  const { ApiEndpoint } = props?.fields || {};
  const apiUrl = ApiEndpoint?.fields?.Value?.value as string;
  const { t } = useTranslate();
  const fullWidthClass = getFullWidth(props?.params?.IsFullWidth);
  const { order, isLoading } = useAutoshipOrderSummary(apiUrl);
  if (isLoading) {
    return <Placeholders />;
  }
  return (
    <>
      <div className={`${fullWidthClass} px-3`}>
        <PricingColumn
          title={t('Autoships_AutoshipOrderSummary_SubTotal')}
          price={order?.Subtotal?.toFixed(2) as string}
          className="py-2"
        />
        <PricingColumn
          title={t('Autoships_AutoshipOrderSummary_Shipping')}
          price={order?.ShippingCost?.toFixed(2) as string}
          className="py-2"
        />
        <PricingColumn
          title={t('Autoships_AutoshipOrderSummary_Tax')}
          price={order?.TaxCost?.toFixed(2) as string}
          className="py-2"
        />
        <PricingColumn
          title={t('Autoships_AutoshipOrderSummary_Total')}
          price={order?.Total?.toFixed(2) as string}
          className="py-2"
        />
      </div>
    </>
  );
};

export default AutoshipOrderSummaryComponent;
