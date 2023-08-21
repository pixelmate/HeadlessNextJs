import { Cart, OrderCloudError, OrderDirection, Orders } from 'ordercloud-javascript-sdk';
import { handleErrors } from 'utils/request';
import { mapOCOrder } from '../schemas/order';

export const getOrderSummary = async (accessToken?: string) => {
  try {
    const response = await Cart.Get({ accessToken });
    return mapOCOrder(response);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
// TODO: Temporary solution for order id Will be changed when submit order will be implemented
export const getOrderId = () => {
  return 'kkGjuK3eHUy0PkagWkzTBA';
};

export const patchShippingAddress = async (
  data: {
    direction: OrderDirection;
    id: string;
    body: Partial<AddressItem>;
  },
  accessToken?: string
) => {
  try {
    const response = await Orders.PatchShippingAddress(data.direction, data.id, data.body, {
      accessToken,
    });
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const patchGiftMessage = async (
  accessToken: string,
  orderId: string,
  GiftOrderMessage: string,
  IsGiftOrder: boolean
) => {
  try {
    const response = await Orders.Patch(
      'Incoming',
      orderId,
      {
        xp: { GiftOrderMessage, IsGiftOrder },
      },
      { accessToken }
    );
    return mapOCOrder(response);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getFailedOrders = async () => {
  try {
    //TODO replace with real data. When everything will be is confirmed and implemented.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = [{ id: '123' }];
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const cancelOrder = async (id: string, accessToken?: string) => {
  try {
    const response = await Orders.Cancel(
      process.env.NEXT_PUBLIC_ORDERCLOUD_INCOMING_DIRECTION! as OrderDirection,
      id,
      { accessToken }
    );
    return mapOCOrder(response);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getOrder = async (
  data: {
    direction: OrderDirection;
    id: string;
  },
  accessToken?: string
) => {
  try {
    const response = await Orders.Get(data?.direction, data?.id, { accessToken });
    return mapOCOrder(response);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
