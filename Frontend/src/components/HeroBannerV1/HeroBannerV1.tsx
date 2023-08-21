import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import type { HeroBannerV1Props } from 'core/molecules/HeroBannerV1/heroBannerV1';

const Modern = dynamic(() => import('core/molecules/HeroBannerV1/Modern'));
const Standard = dynamic(() => import('core/molecules/HeroBannerV1/Standard'));
const Classic = dynamic(() => import('core/molecules/HeroBannerV1/Classic'));

const MAP_THEME_TO_HEROBANNER_V1: Record<string, NextComponentType> = {
  classic: Classic,
  modern: Modern,
  standard: Standard,
};

const HeroBannerV1 = (props: HeroBannerV1Props): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_HEROBANNER_V1[props?.params?.Variation]
    : Standard;

  return <Component {...props} />;
};

export default withDatasourceCheck()<HeroBannerV1Props>(HeroBannerV1);
