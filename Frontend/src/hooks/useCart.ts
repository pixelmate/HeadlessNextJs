import { ChildProduct } from 'core/molecules/ProductDetail/productDetail.types';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { useAddToCart, useGetCart, useUpdateCart, usePatchCart, useCalculateCart } from 'data/cart';
import { useAtom } from 'jotai';
import { cloneDeep } from 'lodash';
import { CartItem } from 'src/schemas/cart';
import useLocalStorage from './useLocalStorage';

const mapListItemToLocalStorage = (item: CartItem) => {
  return {
    id: item?.id || '',
    isAuthenticated: true,
    productId: item?.productId || '',
    quantity: item?.quantity || '',
  } as ProductDetailsType;
};

export type UseCartProps = {
  onAddedToBagSuccess: () => void;
};

export const useCart = (props?: UseCartProps) => {
  const { onAddedToBagSuccess } = props || {};
  const { mutate: updateCartAutoship } = usePatchCart();
  const { mutate: calculateCart } = useCalculateCart();
  const [localStorageCart, setLocalStorageCart] =
    useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const [, setAutoshipCart] = useLocalStorage('CART');
  const mergeProductToLocalStorage = (product: ProductDetailsType): ProductDetailsType[] => {
    const existingProductIndex = localStorageCart.findIndex(
      (cart) => cart.productId === product.productId && cart.isAuthenticated === isAuthenticated
    );
    if (existingProductIndex < 0) {
      return [...localStorageCart, product];
    }
    const cartClone = cloneDeep(localStorageCart);
    cartClone[existingProductIndex] = {
      ...cartClone[existingProductIndex],
      quantity: Number(product.quantity).toString(),
    };
    return cartClone;
  };

  const addProductToLocalStorage = (product: ProductDetailsType) => {
    setLocalStorageCart(mergeProductToLocalStorage(product));
  };

  const [{ isAuthenticated }] = useAtom(authorizationAtom);

  const { data: itemsInCart, isFetching: isFetchingCart } = useGetCart({
    onSuccess: (data) => {
      mergeLocalCartToRemoteCart(data?.items);
      setLocalStorageCart(data?.items?.map((item) => mapListItemToLocalStorage(item)));
      setAutoshipCart({ xp: { IsAutoShipOrder: Boolean(data?.xp?.IsAutoShipOrder) } });
    },
  });
  const { mutate: updateCart, isLoading: isLoadingUpdate } = useUpdateCart({
    onSuccess: (payload) => {
      addProductToLocalStorage({
        isAuthenticated,
        productId: payload.id,
        quantity: payload.quantity,
      });
      onAddedToBagSuccess?.();
      calculateCart();
    },
  });
  const { mutate: addToCart, isLoading: isLoadingAdd } = useAddToCart({
    onSuccess: (payload) => {
      addProductToLocalStorage({
        isAuthenticated,
        productId: payload.productId,
        quantity: payload.quantity,
      });
      onAddedToBagSuccess?.();
      calculateCart();
    },
  });

  const addOrUpdateCart = (
    id: string,
    quantity: string,
    cart: CartItem[] | ProductDetailsType[] | undefined = itemsInCart?.items
  ) => {
    const itemIndex = cart?.findIndex(
      (item) => (item as CartItem).id === id || item.productId === id
    );
    if (itemIndex !== undefined && itemIndex >= 0) {
      updateCart({
        id,
        quantity: (Number(cart?.[itemIndex].quantity) + Number(quantity)).toString(),
      });
      return;
    }
    addToCart({
      productId: id,
      id,
      quantity,
    });
  };

  const addProductToCart = (product: ChildProduct, quantity: number) => {
    if (!isAuthenticated) {
      addProductToLocalStorage({
        productId: product?.id || '',
        quantity: quantity.toString(),
        isAuthenticated,
      });
      onAddedToBagSuccess?.();
    }
    if (isAuthenticated) {
      addOrUpdateCart(product?.id || '', quantity.toString());
    }
  };

  const mergeLocalCartToRemoteCart = (remoteCartItems: CartItem[]) => {
    if (!isAuthenticated) return;
    if (remoteCartItems.length === 0 && localStorageCart.length === 0) return;
    if (localStorageCart.length > 0) {
      const unauthenticatedCart = localStorageCart.filter((item) => !item.isAuthenticated);
      unauthenticatedCart.forEach((cartItem) => {
        addOrUpdateCart(cartItem.productId, cartItem.quantity.toString(), remoteCartItems);
      });
    }
  };
  const itemsCount =
    localStorageCart?.reduce?.(
      (sum, val) => (sum += Number.isNaN(Number(val.quantity)) ? 0 : Number(val.quantity)),
      0
    ) || 0;

  return {
    updateCartAutoship,
    addProductToCart,
    setLocalStorageCart,
    itemsCount,
    localStorageCart,
    isLoading: isFetchingCart || isLoadingAdd || isLoadingUpdate,
  };
};
