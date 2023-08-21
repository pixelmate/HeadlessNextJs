import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ProductListingGridProps } from 'core/molecules/ProductListingGrid';

const ProductListingGridCart = dynamic(() => import('core/molecules/ProductListingGrid/Cart'), {
  ssr: false,
});
const ProductListingGridCheckout = dynamic(
  () => import('core/molecules/ProductListingGrid/Checkout'),
  {
    ssr: false,
  }
);

const MAP_THEME_TO_BASKET: Record<string, NextComponentType> = {
  Checkout: ProductListingGridCheckout,
  Cart: ProductListingGridCart,
};

const Basket = (props: ProductListingGridProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_BASKET[props?.params?.Variation]
    : ProductListingGridCart;

  return <Component {...props} />;
};

export default withDatasourceCheck()(Basket);
