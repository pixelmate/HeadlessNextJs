import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { DeliveryOptionsProps } from 'core/molecules/DeliveryOptions';
import { NextComponentType } from 'next';
import dynamic from 'next/dynamic';

const DeliveryOptionsBasket = dynamic(() => import('core/molecules/DeliveryOptions'));

const DeliveryOptionsCheckout = dynamic(() => import('core/molecules/DeliveryMethodUpdate'));
const MAP_THEME_TO_DELIVERY_OPTIONS: Record<string, NextComponentType> = {
  Checkout: DeliveryOptionsCheckout,
  Basket: DeliveryOptionsBasket,
  //TODO change this delivery vairant when implementing LIF-7054
  Autoship: DeliveryOptionsBasket,
};

const DeliveryOptions = (props: DeliveryOptionsProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_DELIVERY_OPTIONS[props?.params?.Variation]
    : DeliveryOptionsBasket;

  return <Component {...props} />;
};

export default withDatasourceCheck()<DeliveryOptionsProps>(DeliveryOptions);
