import client from './client';
import { STALE_TIME_LONG } from 'constants/query-config';
import { GRAPHQL_API_ENDPOINTS } from 'constants/endpoints';
import { useQuery } from '@tanstack/react-query';

export const useGetWarehouseLocations = () => {
  const { data, isLoading } = useQuery(
    [GRAPHQL_API_ENDPOINTS.WAREHOUSE_LOCATIONS],
    client.graphql.warehouse,
    {
      staleTime: STALE_TIME_LONG,
    }
  );
  return { data, isLoading };
};
