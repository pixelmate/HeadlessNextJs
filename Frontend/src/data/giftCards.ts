import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useError } from 'hooks/useError';
import client from './client';
import { API_ENDPOINTS } from 'constants/endpoints';
import { PromoCode, formatRedemptionCode } from 'src/schemas/spending-accounts';
import { createSpinner, spinnerAtom } from './atoms/spinner';
import { useAtom } from 'jotai';
import { STALE_TIME_LONG } from 'constants/query-config';
import { useUser } from './user';
import useLocalStorage from 'hooks/useLocalStorage';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApplyGiftCard = (props?: { onSuccess: (data: any) => void }) => {
  const { setServerError } = useError();
  const { isAuthenticated } = useUser();
  const [, setRedemptionCodes] = useLocalStorage<PromoCode[]>('REDEMPTION_CODES');
  const queryClient = useQueryClient();
  const [, setSpinner] = useAtom(spinnerAtom);
  const mutationFn = isAuthenticated
    ? (input: { code: PaymentTypePromoCode; redemptionCode?: string }) =>
        client.cart.addPayment(input.code)
    : (input: { code: PaymentTypePromoCode; redemptionCode?: string }) => {
        const formattedCode: PromoCode = {
          balance: Number(input.code.Amount),
          amount: Number(input.code.Amount),
          currency: undefined,
          paymentId: 'notPaymentId-' + formatRedemptionCode(input.redemptionCode),
          redemptionCode: input.redemptionCode || '',
          spendingAccountId: input.code.SpendingAccountID,
        };
        let newCodes;
        setRedemptionCodes((codes: PromoCode[]) => {
          newCodes = [...codes, formattedCode];
          return newCodes;
        });
        return Promise.resolve(newCodes);
      };
  return useMutation(mutationFn, {
    onMutate: () => {
      setSpinner(createSpinner('Applying Promo Code...'));
    },
    onError: (error: Error) => {
      setServerError(error);
    },
    onSuccess: (data) => {
      props?.onSuccess?.(data);
      !isAuthenticated && queryClient.setQueriesData([API_ENDPOINTS.LIST_CART_PAYMENTS], data);
    },
    onSettled: () => {
      setSpinner(null);
      isAuthenticated && queryClient.invalidateQueries([API_ENDPOINTS.LIST_CART_PAYMENTS]);
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteGiftCard = (props?: { onSuccess: () => void }) => {
  const { setServerError } = useError();
  const queryClient = useQueryClient();
  const [, setSpinner] = useAtom(spinnerAtom);
  const { isAuthenticated } = useUser();
  const [, setRedemptionCodes] = useLocalStorage<PromoCode[]>('REDEMPTION_CODES');
  const mutationFn = (id: string) => {
    isAuthenticated
      ? client.cart.deletePayment(id)
      : setRedemptionCodes((codes: PromoCode[]) =>
          codes.filter((item: PromoCode) => item.paymentId !== id)
        );
    return Promise.resolve();
  };

  return useMutation([API_ENDPOINTS.LIST_CART_PAYMENTS], mutationFn, {
    onMutate: (value: string) => {
      queryClient.setQueryData([API_ENDPOINTS.LIST_CART_PAYMENTS], (data: PromoCode[]) => {
        console.log(data.filter((item) => item.paymentId !== value));
        return data.filter((item) => item.paymentId !== value);
      });
      setSpinner(createSpinner('Deleting Promo Code...'));
    },
    onError: (error: Error) => {
      setServerError(error);
    },
    onSuccess: () => {
      props?.onSuccess?.();
      isAuthenticated && queryClient.invalidateQueries([API_ENDPOINTS.LIST_CART_PAYMENTS]);
    },
    onSettled: () => {
      setSpinner(null);
    },
  });
};

export const useGetAppliedGiftCards = (props?: { onSuccess: (data: PromoCode[]) => void }) => {
  const { setServerError } = useError();
  const { isAuthenticated } = useUser();
  const [redemptionCodes] = useLocalStorage<PromoCode[]>('REDEMPTION_CODES');

  const queryFn = isAuthenticated
    ? client.cart.getPayments
    : () => {
        return Promise.resolve(redemptionCodes);
      };
  return useQuery<PromoCode[]>([API_ENDPOINTS.LIST_CART_PAYMENTS], queryFn, {
    onError: (error: Error) => {
      setServerError(error);
    },
    onSuccess: (data) => {
      const codes = isAuthenticated ? data : redemptionCodes;
      props?.onSuccess?.(codes);
    },
    staleTime: STALE_TIME_LONG,
  });
};
