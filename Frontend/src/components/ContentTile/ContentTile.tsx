import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import type { ContentTileProps } from 'core/molecules/ContentTile/contentTile';

const Modern = dynamic(() => import('core/molecules/ContentTile/Modern'));
const Feature = dynamic(() => import('core/molecules/ContentTile/Feature'));
const Classic = dynamic(() => import('core/molecules/ContentTile/Classic'));

const MAP_THEME_TO_CONTENTTILE: Record<string, NextComponentType> = {
  classic: Classic,
  modern: Modern,
  featured: Feature,
};

const ContentTile = (props: ContentTileProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_CONTENTTILE[props?.params?.Variation]
    : Classic;

  return <Component {...props} />;
};

export default withDatasourceCheck()<ContentTileProps>(ContentTile);
