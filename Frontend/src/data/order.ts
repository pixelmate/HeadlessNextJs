import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from './client';
import { STALE_TIME_LONG } from 'constants/query-config';
import { API_ENDPOINTS, MIDDLEWARE_URL } from 'constants/endpoints';
import { useAtom } from 'jotai';
import { authorizationAtom } from './atoms/authorization-atom';
import { useCartItems } from './cart';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/routes';
import { useError } from 'hooks/useError';
import useLocalStorage from 'hooks/useLocalStorage';
import { totalAutoShipSavings, isAutoShipChecked } from 'data/atoms/autoship';
import { USER_GROUP } from 'constants/user';
import { useUserGroups } from 'data/user';
import { getCookie } from 'cookies-next';
import { ORDER_ID } from 'config/index';
import { useGiftCards } from 'hooks/useGiftCards';

export const useOrderSummary = () => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { cart } = useCartItems();
  const { allAppliedGiftCards } = useGiftCards();
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const [autoShipValue] = useAtom(isAutoShipChecked);
  const [localStorageShippingOptions] =
    useLocalStorage<ShippingOptionDetail>('SHIPPING_OPTION_DETAILS');
  const [, setTotalAutoship] = useAtom(totalAutoShipSavings);

  const { data, isLoading, error, fetchStatus } = useQuery<Order, Error>(
    [API_ENDPOINTS.ORDER_SUMMARY],
    client.order.getOrderSummary,
    { staleTime: STALE_TIME_LONG, enabled: isAuthenticated }
  );
  const giftCardsSum = allAppliedGiftCards.reduce(
    (acc, val) => acc + (Number(val?.balance) || 0),
    0
  );
  const orderSummaryInitialState = {
    total: 0,
    autoshipTotal: 0,
    retailTotal: 0,
    giftCards: giftCardsSum,
    shippingCost: 0,
    subtotal: 0,
    taxCost: 0,
    items: [] as BuyerProduct[],
  };

  const orderSummary = isAuthenticated
    ? data || orderSummaryInitialState
    : (cart ?? [])?.reduce((acc, item: BuyerProduct) => {
        const price = item?.PriceSchedules?.[0]?.PriceBreaks?.[0]?.Price || 0;
        const quantity = item?.quantity || 0;
        return {
          ...acc,
          total: acc.total + price * quantity,
          autoshipTotal:
            acc.autoshipTotal +
            (item?.PriceSchedules?.[1]?.PriceBreaks?.[0]?.Price || 0) * quantity,
          retailTotal: acc.retailTotal + (item?.RetailPrice || 0) * quantity,
          shippingCost: parseFloat(localStorageShippingOptions?.shippingCost) || 0,
          taxCost: 0,
        };
      }, orderSummaryInitialState);

  let retailSavings = 0;
  let subtotal = 0;

  if (!isAuthenticated) {
    retailSavings = autoShipValue
      ? Math.abs((orderSummary?.autoshipTotal as number) - orderSummary?.total)
      : 0;
    subtotal = (orderSummary?.retailTotal as number) - retailSavings;
    setTotalAutoship((orderSummary?.autoshipTotal as number) - orderSummary?.total);
  } else {
    subtotal = orderSummary?.subtotal as number;
    if (groupId !== USER_GROUP.RETAIL) {
      const totalRetail = orderSummary?.items?.reduce(
        (total: number, item: { quantity: number; retailPrice: number }) =>
          total + (item?.quantity || 0) * (item?.retailPrice || 0),
        0
      );
      retailSavings = Math.abs(orderSummary?.total - (totalRetail || 0));
    } else {
      let totalRetail = 0;
      let totalAutoship = 0;
      (cart ?? []).forEach((item: BuyerProduct) => {
        totalAutoship +=
          (item?.PriceSchedules?.[1]?.PriceBreaks?.[0]?.Price || 0) * (item?.quantity || 0);
        totalRetail +=
          (item?.PriceSchedules?.[0]?.PriceBreaks?.[0]?.Price || 0) * (item?.quantity || 0);
      });
      retailSavings = autoShipValue ? totalRetail - totalAutoship : 0;
      subtotal = (orderSummary?.subtotal as number) - retailSavings;
      setTotalAutoship(totalRetail - totalAutoship);
    }
  }
  const orderMaxGiftCardSum = subtotal + (orderSummary?.shippingCost ?? 0);
  const giftCards = giftCardsSum <= orderMaxGiftCardSum ? giftCardsSum : orderMaxGiftCardSum;
  const orderTotal = subtotal + (orderSummary?.shippingCost ?? 0) - giftCards;
  const transformedOrderSummary = {
    ...orderSummary,
    giftCards,
    subtotal,
    orderTotal,
    retailSavings,
  } as Order;

  return { cart: transformedOrderSummary, isLoading: isLoading && fetchStatus !== 'idle', error };
};

export const useAutoshipOrderSummary = (url: string) => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);

  //TODO Hardcoding order value due to dependency on autoship order page
  const OrderId = 'kkGjuK3eHUy0PkagWkzTBA';
  const replacedUrl = url.replace('{orderId}', OrderId);
  const { isLoading, error, data } = useQuery(
    [`${MIDDLEWARE_URL}/${replacedUrl}`],
    () => client.cart.getAutoShipCartDetails(replacedUrl),
    {
      staleTime: STALE_TIME_LONG,
      enabled: isAuthenticated,
    }
  );
  return { isLoading, order: data as AutoshipOrder, error };
};

export const usePartialUpdateShippingAddress = (url?: string) => {
  const router = useRouter();
  const { serverError, setServerError } = useError();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    client.order.patchShippingAddress,
    {
      onSuccess: () => {
        url ? router.push(router) : router.push(ROUTES.HOME);
      },
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};

export const useGetOrder = (props?: { onSuccess?: (order: Order) => void }) => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  return useQuery<Order, Error>([API_ENDPOINTS.CART], client.order.getOrder, {
    staleTime: STALE_TIME_LONG,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      props?.onSuccess?.(data);
    },
  });
};

export function useUpdateGiftOrderMessage(props?: { onSuccess?: () => void }) {
  const { data } = useGetOrder();
  const queryClient = useQueryClient();
  return useMutation(
    [API_ENDPOINTS.ORDER_GIFT_MESSAGE],
    (input: { isGiftOrder: boolean; giftOrderMessage: string }) =>
      client.order.patchGiftMessage({
        orderId: data!.id,
        isGiftOrder: input.isGiftOrder,
        giftOrderMessage: input.giftOrderMessage,
      }),
    {
      onSuccess: (order) => {
        queryClient.setQueriesData({ queryKey: [API_ENDPOINTS.CART] }, order);
        props?.onSuccess?.();
      },
    }
  );
}

export const useGetSingleOrder = () => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  // TODO after order submitted and passing to QA for testing
  const orderNumber = (getCookie(ORDER_ID) as string) || 'kkGjuK3eHUy0PkagWkzTBA';
  const orderDirection = process.env.NEXT_PUBLIC_ORDERCLOUD_OUTGOING_DIRECTION;
  return useQuery<Order, Error>(
    [`${API_ENDPOINTS.MY_ORDERS}/${orderDirection}/${orderNumber}`],
    () =>
      client.orders.getSingleOrder({
        direction: orderDirection as orderDirection,
        id: orderNumber as string,
      }),
    {
      staleTime: STALE_TIME_LONG,
      enabled: isAuthenticated,
    }
  );
};
