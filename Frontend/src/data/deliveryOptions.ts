import client from './client';
import { useAtom } from 'jotai';
import { useError } from 'hooks/useError';
import { useI18n } from 'next-localization';
import { API_ENDPOINTS } from 'constants/endpoints';
import { STALE_TIME_LONG } from 'constants/query-config';
import { spinnerAtom, createSpinner } from 'data/atoms/spinner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useShippingRates = (zipcode: string) => {
  const { serverError, setServerError } = useError();
  const { data, isLoading } = useQuery(
    [API_ENDPOINTS.SHIPPING],
    () => client.shipping.getShippingMethods({ zipcode }),
    {
      staleTime: STALE_TIME_LONG,
      enabled: !!zipcode,
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );
  const shouldShowLoading = !!zipcode && isLoading;
  return { loading: shouldShowLoading, shippingRates: data as ShippingRates, serverError };
};

export const useUpdateShipping = () => {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [, setSpinner] = useAtom(spinnerAtom);
  const { serverError, setServerError } = useError();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    client.cart.patchShippingData,
    {
      onMutate: () => {
        setSpinner(createSpinner(t('ShoppingBasket_UpdatingBasket')));
      },
      onSettled: () => {
        setSpinner(null);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.ORDER_SUMMARY] });
      },
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );
  return { mutate, isLoading, isSuccess, isError, error, serverError };
};
