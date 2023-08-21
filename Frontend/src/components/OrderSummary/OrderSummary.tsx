import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { OrderSummaryProps } from 'core/molecules/OrderSummary';

const OrderSummaryBasket = dynamic(() => import('core/molecules/OrderSummary/OrderSummaryBasket'));
const OrderSummaryThankYou = dynamic(
  () => import('core/molecules/OrderSummary/OrderSummaryThankYou')
);
const OrderSummaryCheckout = dynamic(
  () => import('core/molecules/OrderSummary/OrderSummaryCheckout')
);

const MAP_THEME_TO_ORDER_SUMMARY: Record<string, NextComponentType> = {
  Checkout: OrderSummaryCheckout,
  Basket: OrderSummaryBasket,
  ThankYou: OrderSummaryThankYou,
};

const OrderSummary = (props: OrderSummaryProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_ORDER_SUMMARY[props?.params?.Variation]
    : OrderSummaryCheckout;

  return <Component {...props} />;
};

export default OrderSummary;
