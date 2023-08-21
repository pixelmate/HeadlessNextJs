import { Cart, Payment, OrderCloudError } from 'ordercloud-javascript-sdk';
import { mapOcCartToCart, mapCartToOcCart } from '../schemas/cart';
import { mapQueryOptions } from '../schemas/helpers';
import { handleErrors } from 'utils/request';

export const getCart = async (accessToken: string) => {
  const data = await Promise.all([
    Cart.Get({ accessToken }),
    Cart.ListLineItems({}, { accessToken }),
  ]);
  return mapOcCartToCart(data[0], data[1].Items);
};

export const updateCart = async (query?: RequestQuery, accessToken?: string) => {
  try {
    const cartData = mapQueryOptions(query);
    const data = await Cart.Patch(cartData, { accessToken });
    return data;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const modifyCart = async (cart: UpdateCart, accessToken: string) => {
  try {
    const cartData = mapCartToOcCart(cart);
    const data = await Cart.Save(cartData, { accessToken });
    return data;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const submitCart = async () => {
  const order = await Cart.Submit();
  return order.ID;
};

export const getPayments = async (accessToken: string) => {
  const cartPayments = await Cart.ListPayments({}, { accessToken });
  return cartPayments;
};

export const addPayment = async (spendingAccountData: Payment, accessToken: string) => {
  const cartPayments = await Cart.CreatePayment(spendingAccountData, { accessToken });
  return cartPayments;
};

export const deletePayment = async (id: string, accessToken: string) => {
  await Cart.DeletePayment(id, { accessToken });
};

export const calculateCart = async (accessToken: string) => {
  try {
    const data = await Cart.Calculate({ accessToken });
    return data;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
