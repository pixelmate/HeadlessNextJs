import client from './client';
import { useAtom } from 'jotai';
import { cloneDeep } from 'lodash';
import { useError } from 'hooks/useError';
import { lineItems } from 'data/atoms/lineItems';
import { useCalculateCart } from 'data/cart';
import { Dispatch, SetStateAction } from 'react';
import { API_ENDPOINTS } from 'constants/endpoints';
import useLocalStorage from 'hooks/useLocalStorage';
import { LocalStorage, localStorageAtom } from 'data/atoms/localStorage';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

export const updateCart = (
  id: string,
  quantity: number,
  queryClient: QueryClient,
  setCartItems: Dispatch<SetStateAction<BuyerProduct[]>>,
  setLocalStorageCart: Dispatch<SetStateAction<ProductDetailsType[]>>
) => {
  setLocalStorageCart((prevState) => {
    const updatedItems = prevState.map((item) => {
      if (item?.productId === id) {
        return {
          ...item,
          quantity: String(quantity),
        };
      }
      return item;
    });

    return updatedItems;
  });
  setCartItems((prevItems) =>
    prevItems.map((item) => {
      if (item?.productId === id) {
        return { ...item, quantity };
      }
      return item;
    })
  );
  queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.ORDER_SUMMARY] });
};

export const deleteCart = (
  id: string,
  queryClient: QueryClient,
  setStorage: Dispatch<SetStateAction<LocalStorage>>,
  setCartItems: Dispatch<SetStateAction<BuyerProduct[]>>,
  localStorageCart: ProductDetailsType[],
  setLocalStorageCart: Dispatch<SetStateAction<ProductDetailsType[]>>
) => {
  setCartItems((prevState) => prevState.filter((item) => item?.productId !== id));
  setStorage((prevState) => {
    const updatedItems = prevState.PRODUCTS_IN_CART.filter((item) => item?.productId !== id);
    return { ...prevState, PRODUCTS_IN_CART: updatedItems };
  });
  const cartClone = cloneDeep(localStorageCart);
  const updatedCart = cartClone.filter((item) => item?.productId !== id);
  setLocalStorageCart(updatedCart);
  queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.ORDER_SUMMARY] });
};

export const useDeleteLineItem = () => {
  const queryClient = useQueryClient();
  const { mutate: calculateCart } = useCalculateCart();
  const [cartItems, setCartItems] = useAtom(lineItems);
  const [, setStorage] = useAtom(localStorageAtom);
  const { serverError, setServerError } = useError();
  const [localStorageCart, setLocalStorageCart] =
    useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(client.lineItem.delete, {
    onSuccess: (_data, id) => {
      const item = cartItems?.find((item: BuyerProduct) => item?.id === id);
      deleteCart(
        item?.productId as string,
        queryClient,
        setStorage,
        setCartItems,
        localStorageCart,
        setLocalStorageCart
      );
      calculateCart();
    },
    onError: (error: Error) => {
      setServerError(error);
    },
  });

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};

export const useUpdateLineItem = () => {
  const queryClient = useQueryClient();
  const { mutate: calculateCart } = useCalculateCart();
  const [cartItems, setCartItems] = useAtom(lineItems);
  const { serverError, setServerError } = useError();
  const [, setLocalStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(client.lineItem.update, {
    onSuccess: (_data, variables) => {
      const { id, quantity } = variables;
      const item = cartItems?.find((item: BuyerProduct) => item?.id === id);
      updateCart(
        item?.productId as string,
        quantity,
        queryClient,
        setCartItems,
        setLocalStorageCart
      );
      calculateCart();
    },
    onError: (error: Error) => {
      setServerError(error);
    },
  });

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};

export const useUpdateLineItems = (updateLineitems: { id: string; quantity: number }[]) => {
  const { serverError, setServerError } = useError();
  const [cartItems, setCartItems] = useAtom(lineItems);
  const queryClient = useQueryClient();
  const { mutate: calculateCart } = useCalculateCart();
  const [, setLocalStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(client.lineItem.update, {
    onSuccess: (_data, variables) => {
      const { id, quantity } = variables;
      const item = cartItems?.find((item: BuyerProduct) => item?.id === id);
      updateCart(
        item?.productId as string,
        quantity,
        queryClient,
        setCartItems,
        setLocalStorageCart
      );
      calculateCart();
    },
  });

  const updateLineItem = ({ id, quantity }: { id: string; quantity: number }) => {
    try {
      const item = cartItems?.find((item: BuyerProduct) => item?.productId === id);
      mutate({ id: item?.id as string, quantity });
    } catch (error) {
      setServerError(error as Error);
    }
  };

  const executeMutations = () => {
    for (const item of updateLineitems) {
      updateLineItem(item);
    }
  };

  return {
    executeMutations,
    isLoading,
    serverError,
    setServerError,
    isSuccess,
    isError,
    error,
  };
};
