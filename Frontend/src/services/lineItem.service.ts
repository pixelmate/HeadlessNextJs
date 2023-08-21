import { Cart, LineItem } from 'ordercloud-javascript-sdk';
import { CartItem, mapItemToOcLineItem } from '../schemas/cart';

export const getCartItems = async () => {
  return await Cart.Get();
};

export const addCartItem = async (item: LineItem) => {
  return await Cart.CreateLineItem(item);
};

export const updateCartItem = async (item: CartItem, accessToken: string) => {
  const lineItem = mapItemToOcLineItem(item);
  await Cart.PatchLineItem(item.id as string, lineItem, { accessToken });
};

export const deleteCartItem = async (id: string, accessToken: string) => {
  await Cart.DeleteLineItem(id, { accessToken });
};
