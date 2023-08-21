import { LocalStorage } from 'data/atoms/localStorage';
import { LineItem, Order } from 'ordercloud-javascript-sdk';
export type CartItem = {
  productId: string;
  name: string | undefined;
  id: string | undefined;
  image: string;
  itemTotal: number | undefined;
  price: number | undefined;
  quantity: number | undefined;
  stock: number;
  unit: string;
  retailPrice?: number | undefined;
};

export type Cart = {
  id: string;
  items: CartItem[];
  isEmpty: boolean;
  subtotal?: number;
  shippingCost?: number;
  total?: number;
  totalItems: number;
  totalUniqueItems: number;
  billing_address?: string;
  shipping_address?: string;
  xp: AnyObject;
};

export const mapOcCartToCart = (cart: Order, lineItems: LineItem[]): Cart => {
  if (lineItems) {
    return {
      id: cart.ID ?? '',
      items: lineItems?.map((item) => ({
        productId: item.ProductID,
        name: item?.Product?.Name,
        id: item.ID,
        image: item?.Product?.xp?.image?.thumbnail,
        itemTotal: item.LineTotal,
        price: item.UnitPrice,
        quantity: item.Quantity,
        stock: item.xp?.stock,
        unit: item?.Product?.xp?.unit,
        retailPrice: item?.Product?.xp?.RetailPrice,
      })),
      isEmpty: !lineItems || lineItems.length === 0,
      total: cart?.Total,
      subtotal: cart?.Subtotal ?? 0,
      shippingCost: cart?.ShippingCost ?? 0,
      totalItems: lineItems?.length,
      totalUniqueItems: lineItems?.length,
      billing_address: cart.BillingAddressID,
      shipping_address: cart.ShippingAddressID,
      xp: cart.xp,
    };
  }

  return {
    id: '',
    items: [],
    isEmpty: true,
    total: 0,
    subtotal: 0,
    shippingCost: 0,
    totalItems: 0,
    totalUniqueItems: 0,
    xp: {},
  };
};

export const mapCartToOcOrder = (cart: UpdateCart): Order => {
  return {
    BillingAddressID: cart?.billing_address?.id,
    ShippingAddressID: cart?.shipping_address?.id,
    ShippingCost: cart?.shippingCost,
    xp: cart?.xp,
  };
};

export const mapItemToOcLineItem = (item: CartItem): LineItem => {
  return {
    ID: item.id?.toString(),
    ProductID: item.productId?.toString(),
    Quantity: item.quantity,
    UnitPrice: item.price,
    xp: {
      stock: item.stock,
    },
  };
};

export const mapItemToOcNewLineItem = (item: CartItem): LineItem => {
  return {
    ProductID: item.id?.toString() || '',
    Quantity: item.quantity,
    xp: {
      stock: item.stock,
    },
  };
};

export const mapCartToOcCart = (cart: UpdateCart): Order => {
  return {
    ShippingCost: cart?.shippingCost,
    xp: cart?.xp,
  };
};

export const mapLocalStorageToSubmitCart = (
  localStorage: DeepPartial<LocalStorage>
): CartSubmitModel => {
  const forms = Object.entries(localStorage?.GENERIC_FORMS || []);
  const registrationForm = forms.find(([, form]) =>
    Object.keys(form as object).includes('registration')
  )?.[1] as { registration: CartSubmitModel['registrationInformation'] };

  return {
    giftOrderMessage: localStorage.GIFT_ORDER_FORM?.giftOrderMessage || '',
    isAutoShip: Boolean(localStorage.CART?.xp?.IsAutoShipOrder),
    isGiftOrder: Boolean(localStorage.GIFT_ORDER_FORM?.isGiftOrder),
    frequency: localStorage.USER?.xp?.autoshipFrequency || '',
    lineItems:
      localStorage.PRODUCTS_IN_CART?.map((item) => ({
        productId: item?.productId || '',
        quantity: item?.quantity || '',
      })) || [],
    redemptionCodes:
      localStorage.REDEMPTION_CODES?.map((item) => String(item?.redemptionCode)) || [],
    registrationInformation: { ...registrationForm.registration },
    shippingAddress: {
      addressName: localStorage.SHIPPING_ADDRESS?.AddressName || '',
      city: localStorage.SHIPPING_ADDRESS?.City || '',
      id: localStorage.SHIPPING_ADDRESS?.ID || '',
      dateCreated: localStorage.SHIPPING_ADDRESS?.DateCreated || '',
      companyName: localStorage.SHIPPING_ADDRESS?.CompanyName || '',
      firstName: localStorage.SHIPPING_ADDRESS?.FirstName || '',
      lastName: localStorage.SHIPPING_ADDRESS?.LastName || '',
      street1: localStorage.SHIPPING_ADDRESS?.Street1 || '',
      street2: localStorage.SHIPPING_ADDRESS?.Street2 || '',
      state: localStorage.SHIPPING_ADDRESS?.State || '',
      zip: localStorage.SHIPPING_ADDRESS?.Zip || '',
      country: localStorage.SHIPPING_ADDRESS?.Country || '',
      phone: localStorage.SHIPPING_ADDRESS?.Phone || '',
    },
  };
};
