import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from 'constants/endpoints';
import { SPENDING_ACCOUNT } from 'constants/giftCard';
import { STALE_TIME_DEFAULT } from 'constants/query-config';
import client from 'data/client';
import { useApplyGiftCard, useDeleteGiftCard, useGetAppliedGiftCards } from 'data/giftCards';
import { mapCartPaymentToSpendingAccount } from 'src/schemas/giftOrder';
import { PromoCode, formatRedemptionCode } from 'src/schemas/spending-accounts';

export const useSpendingAccount = (redemptionCode: string) => {
  const {
    data: spendingAccountsData,
    isLoading,
    error,
  } = useQuery(
    [API_ENDPOINTS.SPENDING_ACCOUNTS],
    () => client.spendingaccounts.getSpendingAccounts({ redemptionCode }),
    {
      staleTime: STALE_TIME_DEFAULT,
      enabled: !!redemptionCode,
    }
  );
  const shouldShowLoading = !!redemptionCode && isLoading;
  return { spendingAccountsData, loading: shouldShowLoading, error };
};

export const useGiftCards = (props?: { getAppliedGiftCardsOnSuccess?: () => void }) => {
  const { mutate: applyCard, isLoading: isApplyGiftCardLoading } = useApplyGiftCard();
  const {
    mutate: removeGiftCard,
    isLoading: isDeleteGiftCardLoading,
    mutateAsync: deleteCardAsync,
  } = useDeleteGiftCard();
  const {
    data: allAppliedGiftCards,
    isLoading,
    isRefetching,
  } = useGetAppliedGiftCards({
    onSuccess() {
      props?.getAppliedGiftCardsOnSuccess?.();
    },
  });

  const applyGiftCard = (giftCertificateDetails: GiftCertificateBalance) => {
    const createPaymentQuery = mapCartPaymentToSpendingAccount({
      type: SPENDING_ACCOUNT,
      spendingAccountDetails: giftCertificateDetails,
    });
    applyCard({
      code: createPaymentQuery,
      redemptionCode: formatRedemptionCode(giftCertificateDetails.RedemptionCode),
    });
  };

  const appliedGiftCardsSum = allAppliedGiftCards?.reduce(
    (acc: number, item: PromoCode) => acc + (item.amount || 0),
    0
  );

  return {
    allAppliedGiftCards: allAppliedGiftCards || [],
    isDeleteGiftCardLoading,
    isApplyGiftCardLoading,
    isLoading,
    appliedGiftCardsSum,
    isRefetching,
    applyGiftCard,
    removeGiftCard,
    deleteCardAsync,
  };
};
