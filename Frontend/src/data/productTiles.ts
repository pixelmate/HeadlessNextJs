import { useQuery } from '@tanstack/react-query';
import client from './client';
import { ProductTile } from 'core/molecules/ProductDetail/productDetail.types';

export const useGetProductTiles = (apiEndpoint: string, categoryIds: string[]) => {
  return useQuery<{ ProductTiles: ProductTile[] }>([apiEndpoint, categoryIds], () => {
    return client.product.getProductTiles(
      apiEndpoint,
      // TODO - move to fetching sitecore settings
      process.env.NEXT_PUBLIC_ORDERCLOUD_CATALOG_ID!,
      categoryIds
    );
  });
};
