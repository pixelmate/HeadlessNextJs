import { useMutation, useQuery } from '@tanstack/react-query';
import client from './client';
import { MIDDLEWARE_API_ENDPOINTS } from 'constants/endpoints';
import { STALE_TIME_LONG } from 'constants/query-config';

export const useGetGiftCertificateBalance = (props?: {
  onSuccess?: (data?: GiftCertificateBalance, code?: string) => void;
}) => {
  return useMutation(
    [MIDDLEWARE_API_ENDPOINTS.GIFT_CERTIFICATE_BALANCE],
    (redemptionCode: string) =>
      client.users.getGiftCertificateBalance({
        redemptionCode: redemptionCode.replaceAll('-', ''),
      }),
    {
      onSuccess(data, code) {
        props?.onSuccess?.(data, code);
      },
    }
  );
};

// TODO - refactor to more stable soultion above
export const useGetGiftCertificateBalanceOLD = (redemptionCode: string) => {
  const { data, isLoading, error } = useQuery(
    [MIDDLEWARE_API_ENDPOINTS.GIFT_CERTIFICATE_BALANCE, 'OLD'],
    () => client.users.getGiftCertificateBalance({ redemptionCode }),
    {
      staleTime: STALE_TIME_LONG,
      enabled: !!redemptionCode,
    }
  );
  const shouldShowLoading = !!redemptionCode && isLoading;
  return { data, loading: shouldShowLoading, error };
};
