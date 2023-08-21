import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from './client';
import { API_ENDPOINTS, MIDDLEWARE_API_ENDPOINTS } from 'constants/endpoints';
import { Cart } from 'src/schemas/cart';
import { STALE_TIME_LONG } from 'constants/query-config';
import useLocalStorage from 'hooks/useLocalStorage';
import { useAtom } from 'jotai';
import { authorizationAtom } from './atoms/authorization-atom';
import { lineItems } from './atoms/lineItems';
import { isAutoShipChecked } from 'data/atoms/autoship';
import { useError } from 'hooks/useError';

export const useGetCart = (props?: { onSuccess?: (cart: Cart) => void }) => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const [autoshipChecked, setAutoshipChecked] = useAtom(isAutoShipChecked);
  const [, setAutoshipCart] = useLocalStorage('CART');
  const [autoshipUser, setAutoshipUser] = useLocalStorage<AutoshipUser>('USER');
  return useQuery([API_ENDPOINTS.CART], client.cart.get, {
    staleTime: STALE_TIME_LONG,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      props?.onSuccess?.(data);
      const autoShip = !!data?.xp?.IsAutoShipOrder
        ? (data?.xp?.IsAutoShipOrder as boolean)
        : autoshipChecked;
      setAutoshipCart({ xp: { IsAutoShipOrder: autoShip } });
      setAutoshipUser((prevState: AutoshipUser) => {
        return {
          xp: {
            ...prevState?.xp,
            IsAutoShip: autoShip,
            autoshipFrequency: !!data?.xp?.AutoshipFrequency
              ? (data?.xp?.AutoshipFrequency as string)
              : autoshipUser?.xp?.autoshipFrequency,
          },
        };
      });
      setAutoshipChecked(autoShip);
    },
  });
};

export function useUpdateCart(props?: {
  onSuccess?: (payload: { id: string; quantity: string }) => void;
}) {
  const queryClient = useQueryClient();
  const { refetch } = useCartItems();
  return useMutation([API_ENDPOINTS.CART], client.cart.update, {
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CART] });
      props?.onSuccess?.(payload);
      refetch();
    },
  });
}

export function useAddToCart(props?: {
  onSuccess?: (payload: { id: string; quantity: string; productId: string }) => void;
}) {
  const queryClient = useQueryClient();
  const { refetch } = useCartItems();
  const [localStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  return useMutation([API_ENDPOINTS.CART], client.cart.add, {
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CART] });
      props?.onSuccess?.(payload);
      if (!!localStorageCart?.length) {
        refetch();
      }
    },
  });
}

export function useDeleteFromCart(props?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const { refetch } = useCartItems();
  return useMutation([API_ENDPOINTS.CART], client.cart.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CART] });
      props?.onSuccess?.();
      refetch();
    },
  });
}

export function useUpdateGiftCartMessage(props?: { onSuccess?: () => void }) {
  const { data } = useGetCart();
  const queryClient = useQueryClient();
  return useMutation(
    [API_ENDPOINTS.CART],
    (input: { isGiftOrder: boolean; giftOrderMessage: string }) =>
      client.cart.patchGiftMessage({
        cartId: data!.id,
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

export function usePatchCart(props?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation([API_ENDPOINTS.CART], client.cart.patchCart, {
    onSuccess: (order) => {
      queryClient.setQueriesData({ queryKey: [API_ENDPOINTS.CART] }, order);
      props?.onSuccess?.();
    },
  });
}

export const useCartItems = () => {
  const [localStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const [cart, setCartItems] = useAtom(lineItems);
  const products = localStorageCart.reduce((acc, item) => `${acc},${item?.productId}`, '');
  const productIds = products?.slice(1);
  const { isLoading, error, isFetching, refetch } = useQuery(
    [MIDDLEWARE_API_ENDPOINTS.CART_PRODUCT_DETAILS],
    () => client.cart.getCartDetails(productIds as string),
    {
      staleTime: STALE_TIME_LONG,
      enabled: !!localStorageCart?.length,
      onSuccess: (data: BuyerProduct[]) => {
        const cart = data?.map((item: BuyerProduct) => {
          return {
            ...item,
            quantity: Number(
              localStorageCart.find((cartItem) => cartItem?.productId === item?.Id)?.quantity
            ),
            productId: localStorageCart.find((cartItem) => cartItem?.productId === item?.Id)
              ?.productId,
            id: localStorageCart.find((cartItem) => cartItem?.productId === item?.Id)?.id,
          };
        });
        setCartItems(cart);
      },
    }
  );

  const shouldShowLoading = !!localStorageCart.length && isLoading;

  return { cart, isLoading: shouldShowLoading, error, isFetching, refetch, localStorageCart };
};

export function useCalculateCart() {
  const { serverError, setServerError } = useError();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(client.cart.calculateCart, {
    onError: (error: Error) => {
      setServerError(error);
    },
  });

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
}
