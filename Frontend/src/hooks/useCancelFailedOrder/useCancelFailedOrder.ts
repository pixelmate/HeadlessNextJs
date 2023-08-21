import { useMutation } from '@tanstack/react-query';
import client from 'data/client';
import { OrderCloudError } from 'ordercloud-javascript-sdk';
import { mapOCOrder } from 'src/schemas/order';
import { handleErrors } from 'utils/request';

export function useCancelFailedOrder(props: {
  onSuccess?: (data: Order | OrderCloudError | undefined) => void;
}) {
  return useMutation(
    async (payload: { id: string }) => {
      try {
        const data = await client.orders.cancelFailedOrder(payload);
        return data;
      } catch (error) {
        return handleErrors(error as OrderCloudError);
      }
    },
    {
      onSuccess: (data: string | OrderCloudError) => {
        let orderData: Order | OrderCloudError | undefined;
        if (data && typeof data === 'string') {
          try {
            orderData = JSON.parse(data as string);
            orderData = mapOCOrder(orderData as Order);
          } catch (error) {
            console.log('Error', error);
          }
        }
        if ((data as OrderCloudError)?.status === 404) {
          orderData = data as OrderCloudError;
        }

        props.onSuccess?.(orderData);
      },
    }
  );
}
