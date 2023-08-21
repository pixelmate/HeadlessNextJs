import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { NextComponentType } from 'next';
import dynamic from 'next/dynamic';
import { GiftOrderProps } from 'core/molecules/GiftOrder';

const GiftOrderAdd = dynamic(() => import('core/molecules/GiftOrder/GiftOrderAdd'), {
  ssr: false,
});
const GiftOrderUpdate = dynamic(() => import('core/molecules/GiftOrder/GiftOrderUpdate'), {
  ssr: false,
});

const MAP_ACTION_TO_GIFT_ORDER: Record<string, NextComponentType> = {
  Add: GiftOrderAdd,
  Update: GiftOrderUpdate,
};

const GiftOrder = (props: GiftOrderProps): JSX.Element => {
  const Component = props?.params?.Variant
    ? MAP_ACTION_TO_GIFT_ORDER[props?.params?.Variant]
    : GiftOrderAdd;

  return <Component {...props} />;
};

export default withDatasourceCheck()<GiftOrderProps>(GiftOrder);
