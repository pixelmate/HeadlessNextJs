import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import type { HeroBannerV2Props } from 'core/molecules/HeroBannerV2/heroBannerV2';

const Modern = dynamic(() => import('core/molecules/HeroBannerV2/Modern'));
const Classic = dynamic(() => import('core/molecules/HeroBannerV2/Classic'));

const MAP_THEME_TO_CONTENTTILE: Record<string, NextComponentType> = {
  classic: Classic,
  modern: Modern,
};

const HeroBannerV2 = (props: HeroBannerV2Props): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_CONTENTTILE[props?.params?.Variation]
    : Classic;

  return <Component {...props} />;
};

export default withDatasourceCheck()<HeroBannerV2Props>(HeroBannerV2);
