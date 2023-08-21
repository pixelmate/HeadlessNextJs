import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { CuratedProductListProps } from 'core/molecules/CuratedProductList/CuratedProductList';

const Modern = dynamic(() => import('core/molecules/CuratedProductList/Modern'));
const Classic = dynamic(() => import('core/molecules/CuratedProductList/Classic'));

const MAP_THEME_TO_CURATEDPRODUCTIST: Record<string, NextComponentType> = {
  classic: Classic,
  modern: Modern,
};

const CuratedProductList = (props: CuratedProductListProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_CURATEDPRODUCTIST[props?.params?.Variation]
    : Modern;
  return <Component {...props} />;
};

export default withDatasourceCheck()<CuratedProductListProps>(CuratedProductList);
