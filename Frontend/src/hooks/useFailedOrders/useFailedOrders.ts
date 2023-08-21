import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from 'constants/endpoints';
import client from 'data/client';

export const useFailedOrders = (props: { onSuccess?: (data: IFailedOrder[]) => void }) => {
  return useQuery([API_ENDPOINTS.ORDERS_FAILED], {
    queryFn: client.orders.getFailedOrders,
    retry: 0,
    onSuccess: props.onSuccess,
  });
};

export default useFailedOrders;
