import { DEFAULT_AUTOSHIP_PERIOD } from 'constants/autoship';
import { VARIANTS } from 'constants/variants';
import Placeholders from 'core/atoms/Placeholders';
import { lineItems } from 'data/atoms/lineItems';
import { useOrderSummary } from 'data/order';
import useLocalStorage from 'hooks/useLocalStorage';
import { useTranslate } from 'hooks/useTranslate';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { ROUTES } from 'utils/routes';
import styles from './OrderSummary.module.scss';
import { OrderSummaryProps } from './OrderSummary.type';
import getFullWidth from 'utils/getFullWidth';
import PricingColumn from 'core/atoms/PricingColumn/PricingColumn';

const OrderSummaryBasket = (props: OrderSummaryProps) => {
  const { CheckoutCTA } = props?.fields || {};
  const [cartItems] = useAtom(lineItems);
  const router = useRouter();
  const { t } = useTranslate();
  const [autoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const fullWidthClass = getFullWidth(props?.params?.IsFullWidth);

  const { cart, isLoading } = useOrderSummary();
  if (isLoading) {
    return <Placeholders />;
  }
  const handleCheckout = () => {
    router.push(CheckoutCTA?.value?.href || ROUTES.HOME);
  };
  return (
    <>
      <div className={fullWidthClass}>
        <PricingColumn
          title={t('Form_Generic_Tag_TotalRetail')}
          price={cart?.total?.toFixed(2) as string}
          className="pb-1"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_RetailSavings')}
          price={cart?.retailSavings?.toFixed(2) as string}
          className={`${styles.orderSummary_bg_saving_info} pb-1`}
          invertNum={true}
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Tax')}
          price={(cart?.taxCost?.toFixed(2) as string) || '0.00'}
          className="pb-1"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_Subtotal')}
          price={(cart?.subtotal?.toFixed(2) as string) || '0.00'}
          className="pb-1"
        />
        <PricingColumn
          title={t('Form_Generic_Tag_Shipping')}
          price={(cart?.shippingCost?.toFixed(2) as string) || '0.00'}
          className="pb-1"
        />

        <PricingColumn
          title={t('Form_Generic_Tag_GiftCards')}
          price={cart?.giftCards?.toFixed(2) || '0.00'}
          className="pb-1"
          invertNum={true}
        />

        <PricingColumn
          title={t('Form_Generic_Tag_OrderTotal')}
          price={(cart?.orderTotal?.toFixed(2) as string) || '0.00'}
          className="pb-1"
        />
        {props?.params?.Variation !== VARIANTS.CHECKOUT && (
          <div className="text-end my-4">
            <Button
              className="me-3 btn btn-success px-5"
              variant="success"
              onClick={handleCheckout}
              disabled={
                !cartItems ||
                cartItems?.length === 0 ||
                (!!autoshipUser?.xp?.IsAutoShip &&
                  autoshipUser?.xp?.autoshipFrequency === DEFAULT_AUTOSHIP_PERIOD)
              }
            >
              {t('OrderSummary_Checkout')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderSummaryBasket;
