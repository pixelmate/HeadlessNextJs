import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { authorizationAtom, checkIsLoggedIn } from './atoms/authorization-atom';
import client from './client';
import { setToken } from 'utils/auth-utils';
import { API_ENDPOINTS, MIDDLEWARE_API_ENDPOINTS } from 'constants/endpoints';
import { ROUTES } from 'utils/routes';
import { useRouter } from 'next/router';
import { STALE_TIME_LONG } from 'constants/query-config';
import { useError } from 'hooks/useError';
import { REFRESH_TOKEN } from 'src/config';
import Cookies from 'js-cookie';
import { ProductDetailAttributes } from 'core/molecules/ProductDetail/productDetail.types';
import useLocalStorage from 'hooks/useLocalStorage';
import { ProductDetailsType } from './atoms/localStorage';
import { useI18n } from 'next-localization';
import { spinnerAtom, createSpinner } from 'data/atoms/spinner';

export function useAuthorization(url?: string) {
  const queryClient = useQueryClient();
  const [localStorageCart, setLocalStorageCart] =
    useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const { serverError, setServerError } = useError();
  const [, setAuthorized] = useAtom(authorizationAtom);
  const router = useRouter();
  const removeRefreshToken = (): void => {
    Cookies.remove(REFRESH_TOKEN);
  };

  const { mutate, isLoading } = useMutation(client.users.signIn, {
    onSuccess: (data) => {
      setToken(data.accessToken, data.refreshToken);
      url ? router.push(url) : router.push(ROUTES.HOME);
      const isLoggedIn = checkIsLoggedIn();
      setAuthorized(isLoggedIn);
      queryClient.invalidateQueries([API_ENDPOINTS.CART]);
      isLoggedIn.isAuthenticated
        ? (queryClient.invalidateQueries([MIDDLEWARE_API_ENDPOINTS.CART_PRODUCT_DETAILS]),
          setLocalStorageCart(localStorageCart))
        : queryClient.invalidateQueries([MIDDLEWARE_API_ENDPOINTS.PRODUCT_ATTRIBUTES]);
      queryClient.invalidateQueries([API_ENDPOINTS.USERS_ME]);
      queryClient.invalidateQueries([API_ENDPOINTS.USER_GROUP]);
    },
    onError: setServerError,
  });

  return { mutate, removeRefreshToken, isLoading, serverError };
}

export function useRefreshToken() {
  const { serverError, setServerError } = useError();
  const [, setAuthorized] = useAtom(authorizationAtom);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(client.users.token, {
    onSuccess: (data) => {
      setToken(data.accessToken, data.refreshToken);
      setAuthorized(checkIsLoggedIn());
      queryClient.invalidateQueries([API_ENDPOINTS.USERS_ME]);
      queryClient.invalidateQueries([MIDDLEWARE_API_ENDPOINTS.CART_PRODUCT_DETAILS]);
      queryClient.invalidateQueries([API_ENDPOINTS.GIFT_CARD]);
    },
    onError: (error: Error) => {
      setServerError(error);
    },
  });

  return { mutate, serverError, isLoading };
}

export const useProductAttributes = (productId: string) => {
  const { isLoading, data } = useQuery<ProductDetailAttributes>(
    [MIDDLEWARE_API_ENDPOINTS.PRODUCT_ATTRIBUTES, productId],
    () => client.product.getProduct(productId),
    { staleTime: STALE_TIME_LONG }
  );
  return { isLoading, data };
};

export const useUser = () => {
  const [{ isAuthenticated, refreshToken }] = useAtom(authorizationAtom);
  const [, setAutoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const { data, isLoading, error, isFetched } = useQuery<User, Error>(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      staleTime: STALE_TIME_LONG,
      enabled: isAuthenticated,
      onSuccess: (data) => {
        setAutoshipUser((prevState: AutoshipUser) => {
          return {
            xp: {
              ...prevState?.xp,
              IsAutoShip: Boolean(data?.xp?.IsAutoShip),
            },
          };
        });
      },
    }
  );

  return { user: data, isLoading, error, isAuthenticated, refreshToken, isFetched };
};

export const useUserGroups = () => {
  const { data } = useQuery([API_ENDPOINTS.USER_GROUP], client.users.getUserGroups, {
    staleTime: STALE_TIME_LONG,
  });
  return { userGroup: data };
};

export const useAddresses = (props: { onSettled: (data: Address) => void }) => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  useQuery<Address, Error>([API_ENDPOINTS.USERS_ME_ADDRESSES], client.users.addresses, {
    staleTime: STALE_TIME_LONG,
    onSettled: props.onSettled,
    cacheTime: 0,
  });

  return { isAuthenticated };
};

export function useUpdateUserPassword(url?: string) {
  const router = useRouter();
  const { serverError, setServerError } = useError();

  const { mutate, isLoading } = useMutation(client.users.updatePassword, {
    onSuccess: () => {
      url ? (window.location.href = url) : router.push(ROUTES.HOME);
    },
    onError: setServerError,
  });

  return { mutate, isLoading, serverError };
}

export const useUpdateUser = () => {
  const { serverError, setServerError } = useError();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation(client.users.updateUser, {
    onError: (error: Error) => {
      setServerError(error);
    },
  });

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};

export const useUpdateUserAutoship = () => {
  const { serverError, setServerError } = useError();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    client.users.updateUserAutoship,
    {
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};

export const useUpdateShippingAddress = (props: {
  onSuccess: (data: AddressChangeResponse | undefined) => void;
}) => {
  const { setServerError } = useError();

  const { mutate, data } = useMutation(client.users.updateShippingAddress, {
    onError: (error: Error) => {
      setServerError(error);
    },
    onSuccess: props.onSuccess,
  });

  return { mutate, data };
};

export const useAddShippingAddress = (props: {
  onSuccess: (data: AddressChangeResponse) => void;
}) => {
  const { setServerError } = useError();

  const { mutate, data } = useMutation(client.users.addShippingAddress, {
    onError: (error: Error) => {
      setServerError(error);
    },
    onSuccess: props.onSuccess,
  });

  return { mutate, data };
};

export const useGiftCards = () => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);

  const { data, isLoading } = useQuery([API_ENDPOINTS.GIFT_CARD], client.users.getGiftCards, {
    staleTime: STALE_TIME_LONG,
    enabled: isAuthenticated,
  });
  return { data, isLoading };
};

export const useOrders = (query?: RequestQuery) => {
  const [{ isAuthenticated }] = useAtom(authorizationAtom);

  const { data, isFetched } = useQuery(
    [API_ENDPOINTS.ORDERS],
    () => client.users.getOrders(query as RequestQuery),
    {
      staleTime: STALE_TIME_LONG,
      enabled: isAuthenticated,
    }
  );
  return { orders: data, isFetched };
};

export const useNewUser = (url?: string) => {
  const router = useRouter();
  const redirectTo = () => {
    router.push(url || ROUTES.HOME);
  };
  return { redirectTo };
};

export function useUpdateAutoship() {
  const { serverError, setServerError } = useError();
  const { t } = useI18n();
  const [, setSpinner] = useAtom(spinnerAtom);
  const { mutate, isLoading } = useMutation(client.users.autoship, {
    onMutate: () => {
      setSpinner(createSpinner(t('ShoppingBasket_UpdatingBasket')));
    },
    onSettled: () => {
      setSpinner(null);
    },
    onError: setServerError,
  });

  return { mutate, isLoading, serverError };
}
