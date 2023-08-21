import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from 'constants/endpoints';
import client from 'data/client';
import { getSingleProduct } from 'services/products.service';

type SingleProductResponse = AxiosResponse<Awaited<ReturnType<typeof getSingleProduct>>>;
export const useGetSingleProduct = (props: { onSuccess: (data: Product | undefined) => void }) => {
  return useMutation(
    [API_ENDPOINTS.PRODUCTS_SINGLE_PRODUCT],
    (productId: string) =>
      client.product.getSingleProductData({
        productId: productId,
      }),
    {
      onSuccess: (data: SingleProductResponse) => {
        let tmpProduct: Product | undefined = undefined;
        if (data && !('status' in data)) {
          tmpProduct = data;
        }
        props.onSuccess(tmpProduct);
      },
    }
  );
};
