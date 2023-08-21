import { PromoCodeProps } from 'core/molecules/PromoCode/PromoCode.type';
import { NextComponentType } from 'next';
import dynamic from 'next/dynamic';

const PromoCodeClassic = dynamic(() => import('core/molecules/PromoCode/PromoCodeClassic'), {
  ssr: false,
});
const PromoCodeModern = dynamic(() => import('core/molecules/PromoCode/PromoCodeModern'), {
  ssr: false,
});

const MAP_THEME_TO_ORDER_SUMMARY: Record<string, NextComponentType> = {
  Classic: PromoCodeClassic,
  Modern: PromoCodeModern,
};

const PromoCode = (props: PromoCodeProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_ORDER_SUMMARY[props?.params?.Variation]
    : PromoCodeClassic;

  return <Component />;
};
export default PromoCode;
