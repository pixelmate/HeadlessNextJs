import dynamic from 'next/dynamic';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import type { CardListProps } from 'core/molecules/CardList/cardList';
import { ComponentType } from 'react';

const Classic = dynamic(() => import('core/molecules/CardList/Classic'));
const Modern = dynamic(() => import('core/molecules/CardList/Modern'));
const Neon = dynamic(() => import('core/molecules/CardList/Neon'));
const Standard = dynamic(() => import('core/molecules/CardList/Standard'));

const MAP_THEME_TO_CARDLIST: Record<string, ComponentType<CardListProps>> = {
  classic: Classic,
  modern: Modern,
  neon: Neon,
  standard: Standard,
};

const CardList = (props: CardListProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_CARDLIST[props?.params?.Variation]
    : Classic;

  return <Component {...props} />;
};

export default withDatasourceCheck()<CardListProps>(CardList);
