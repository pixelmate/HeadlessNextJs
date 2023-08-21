import {
  API_ENDPOINTS,
  MIDDLEWARE_API_ENDPOINTS,
  GRAPHQL_API_ENDPOINTS,
} from 'constants/endpoints';
import { HttpClient } from './http-client';
import {
  ProductDetailAttributes,
  ProductTile,
} from 'core/molecules/ProductDetail/productDetail.types';
import { Cart } from 'src/schemas/cart';
import { OrderDirection, Searchable } from 'ordercloud-javascript-sdk';
import { PromoCode } from 'src/schemas/spending-accounts';

export interface RefreshTokenInput {
  refreshToken: string;
}

export type GiftCertificate = {
  RecipientName: string;
  RecipientEmail: string;
  SenderName: string;
  Amount: string;
  Message: string;
  GiftCode: string;
  GiftDesignFormat: string;
};

const MIDDLEWARE_URL = process.env.NEXT_PUBLIC_MIDDLEWARE_URL;

class Client {
  users = {
    me: () => HttpClient.get<User>(API_ENDPOINTS.USERS_ME),
    signIn: (input?: SignInUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.SIGN_IN, input),
    token: (input: RefreshTokenInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.TOKEN, input),
    updatePassword: (input: UpdateUserPasswordInput) =>
      HttpClient.post<PasswordChangeResponse>(API_ENDPOINTS.USERS_ME_PASSWORD, input),
    updateUser: (input: Partial<User>) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_ME, input),
    updateUserAutoship: (input: Partial<User>) =>
      HttpClient.patch<User>(`${API_ENDPOINTS.USERS_ME}`, input),
    addresses: () => HttpClient.get<Address>(API_ENDPOINTS.USERS_ME_ADDRESSES),
    updateShippingAddress: (data: { id: string; body: Partial<AddressItem> }) =>
      HttpClient.patch<AddressChangeResponse>(
        `${API_ENDPOINTS.USERS_ME_ADDRESSES}/${data.id}`,
        data.body
      ),
    addShippingAddress: (body: Partial<AddressItem>) =>
      HttpClient.post<AddressChangeResponse>(API_ENDPOINTS.USERS_ME_ADDRESSES, body),
    getGiftCards: () => HttpClient.get<GiftCertificateListItemProps>(API_ENDPOINTS.GIFT_CARD),
    getOrders: (query: RequestQuery) => HttpClient.get<OrdersMe>(API_ENDPOINTS.ORDERS, query),
    getGiftCertificateBalance: (input: { redemptionCode: string }) =>
      HttpClient.get<GiftCertificateBalance>(
        `${MIDDLEWARE_API_ENDPOINTS.GIFT_CERTIFICATE_BALANCE}?redemptionCode=${input.redemptionCode}`
      ),
    autoship: (input: { autoship: boolean }) =>
      HttpClient.post(`${MIDDLEWARE_URL}/api/user/autoShip?isAutoShip=${input?.autoship}`, input),
    getUserGroups: () => HttpClient.get<UserGroup>(API_ENDPOINTS.USER_GROUP),
    getUserByXpProperty: (payload: { value: string | undefined; property: string }) =>
      HttpClient.get(API_ENDPOINTS.USERS_USER_BY_XP_PROPERTY, payload),
    getUserByParamManually: (payload: {
      search: string;
      param: Searchable<'Users.List'>[number];
    }) => HttpClient.get(API_ENDPOINTS.USERS_USER_BY_PARAM, payload),
    resetForgottenPassword: (payload: { email: string; username: string; url: string }) =>
      HttpClient.post(API_ENDPOINTS.FORGOTTEN_PASSWORD, payload),
    getForgottenUsername: (email: string) =>
      HttpClient.post<string>(`${MIDDLEWARE_API_ENDPOINTS.FORGOTTEN_USERNAME}?email=${email}`, {
        email,
      }),
    resetPassword: (payload: { password: string; username: string; verificationCode: string }) =>
      HttpClient.put(
        `${MIDDLEWARE_API_ENDPOINTS.RESET_PASSWORD}?password=${payload.password}&username=${payload.username}&verificationCode=${payload.verificationCode}`,
        payload
      ),
  };
  product = {
    getProduct: (productId: string) =>
      HttpClient.get<ProductDetailAttributes>(
        `${MIDDLEWARE_API_ENDPOINTS.PRODUCT_ATTRIBUTES}?productId=${productId}`
      ),
    getProductTiles: (endpoint: string, CatalogId: string, CategoryIds: string[]) =>
      HttpClient.get<{ ProductTiles: ProductTile[] }>(`${MIDDLEWARE_URL}/${endpoint}`, {
        CatalogId,
        CategoryIds: CategoryIds.join(','),
      }),
    getSingleProductData: (payload: { productId: string | undefined }) =>
      HttpClient.get(API_ENDPOINTS.PRODUCTS_SINGLE_PRODUCT, payload),
  };
  cart = {
    get: () => HttpClient.get<Cart>(API_ENDPOINTS.CART),
    getPayments: () => HttpClient.get<PromoCode[]>(API_ENDPOINTS.LIST_CART_PAYMENTS),
    addPayment: (input: PaymentTypePromoCode) =>
      HttpClient.post(`${API_ENDPOINTS.LIST_CART_PAYMENTS}`, input),
    deletePayment: (id: string) =>
      HttpClient.delete<void>(`${API_ENDPOINTS.LIST_CART_PAYMENTS}/${id}`),
    add: (input: { id: string; quantity: string; productId: string }) =>
      HttpClient.post(`${MIDDLEWARE_URL}/api/cart/add`, input),
    update: (input: { id: string; quantity: string }) =>
      HttpClient.patch(`${MIDDLEWARE_URL}/api/cart/update`, input),
    patchCart: (input?: AutoShipDetail) => HttpClient.patch<Order>(API_ENDPOINTS.CART, input),
    delete: (id: string) => HttpClient.delete(`${MIDDLEWARE_URL}/api/cart/delete?id=${id}`),
    getCartItems: (input: { products: string }) =>
      HttpClient.get<BuyerProductItems>(API_ENDPOINTS.CART_ITEMS, input),
    getCartDetails: (productIds: string) =>
      HttpClient.get(`${MIDDLEWARE_URL}/api/products/cartProductDetails?productIds=${productIds}`),
    getAutoShipCartDetails: (url: string) => HttpClient.get(`${MIDDLEWARE_URL}/${url}`),
    patchGiftMessage: (input: { cartId: string; giftOrderMessage: string; isGiftOrder: boolean }) =>
      HttpClient.patch<Order>(API_ENDPOINTS.CART, {
        cartId: input.cartId,
        xp: {
          giftOrderMessage: input.giftOrderMessage,
          isGiftOrder: input.isGiftOrder,
        },
      }),
    patchShippingData: (input: ShippingOptionDetail) => HttpClient.put(API_ENDPOINTS.CART, input),
    calculateCart: () => HttpClient.post(API_ENDPOINTS.CALCULATE_CART, {}),
  };
  order = {
    getOrder: () => HttpClient.get<Order>(API_ENDPOINTS.CART),
    // TODO: Temporary solution for order id Will be changed when submit order will be implemented
    getOrderId: () => HttpClient.post<number>(API_ENDPOINTS.ORDER_ID, {}),
    getOrderSummary: () => HttpClient.get<Order>(API_ENDPOINTS.CART),
    patchGiftMessage: (input: {
      orderId: string;
      giftOrderMessage: string;
      isGiftOrder: boolean;
    }) => HttpClient.patch<Order>(API_ENDPOINTS.ORDER_GIFT_MESSAGE, input),
    patchShippingAddress: (data: {
      direction: OrderDirection;
      id: string;
      body: Partial<AddressItem>;
    }) =>
      HttpClient.patch<Order>(`${API_ENDPOINTS.ORDERS}/${data?.direction}/${data?.id}`, data.body),
  };
  orders = {
    getSingleOrder: (data: { direction: OrderDirection; id: string }) =>
      HttpClient.get<Order>(`${API_ENDPOINTS.MY_ORDERS}/${data?.direction}/${data?.id}`),
    getFailedOrders: () => HttpClient.get<IFailedOrder[]>(API_ENDPOINTS.ORDERS_FAILED),
    cancelFailedOrder: (payload: { id: string }) =>
      HttpClient.post<string>(API_ENDPOINTS.ORDERS_CANCEL, payload),
  };
  informationRequest = {
    getInformationRequest: (endpoint: string) => HttpClient.get(`${MIDDLEWARE_URL}${endpoint}`),
  };
  lineItem = {
    delete: (lineItemId: string) => HttpClient.delete(`${API_ENDPOINTS.LINE_ITEM}/${lineItemId}`),
    update: (input: { id: string; quantity: number }) =>
      HttpClient.patch(`${API_ENDPOINTS.LINE_ITEM}/${input.id}`, input),
  };
  validate = {
    address: (body: ValidateAddressBody) =>
      HttpClient.post<ValidateAddressResponse>(
        `${MIDDLEWARE_API_ENDPOINTS.VALIDATE_ADDRESS}`,
        body
      ),
  };
  giftCertificate = {
    reIssueGiftCertificate: (data: { url: string; formData: GiftCertificate }) =>
      HttpClient.post(`${MIDDLEWARE_URL}/${data?.url}`, { data: data?.formData }),
  };
  graphql = {
    warehouse: () => HttpClient.get<WareHouseItem[]>(GRAPHQL_API_ENDPOINTS.WAREHOUSE_LOCATIONS),
    regionCodes: () => HttpClient.get<RegionItem[]>(GRAPHQL_API_ENDPOINTS.REGION_CODES),
  };
  shipping = {
    getShippingMethods: (input: { zipcode: string }) =>
      HttpClient.get(`${API_ENDPOINTS.SHIPPING}?zipcode=${input.zipcode}`),
  };
  genericForm = {
    submit: (endpoint: string, data?: unknown) => HttpClient.post(endpoint, data),
  };
  spendingaccounts = {
    getSpendingAccounts: (input: { redemptionCode: string }) =>
      HttpClient.get(`${API_ENDPOINTS.SPENDING_ACCOUNTS}?code=${input.redemptionCode}`),
  };
  subscribe = {
    subscribeToNewsletter: (data: { url: string; email: string }) =>
      HttpClient.post(`${MIDDLEWARE_URL}/${data?.url}`, data?.email),
  };
}

const ClientInstance = new Client();

export default ClientInstance;
