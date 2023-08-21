export const API_ENDPOINTS = {
  SUBSCRIPTION: '/api/subscription',
  USERS_ME: '/api/me',
  USERS_ME_PASSWORD: '/api/me/password',
  USERS_REALNAME: '/api/users/validate-realname',
  USERS_USER_BY_XP_PROPERTY: '/api/users/user-by/xp',
  USERS_USER_BY_PARAM: '/api/users/user-by/param',
  SIGN_IN: '/api/signin',
  TOKEN: '/api/token',
  CART: '/api/cart',
  CART_ITEMS: '/api/cart/listCartItems',
  ORDER_SUMMARY: '/api/order',
  ORDER_GIFT_MESSAGE: '/api/order/gift-message',
  ORDERS_FAILED: '/api/orders/failed',
  ORDERS_CANCEL: '/api/orders/cancel',
  FORGOTTEN_PASSWORD: '/api/users/reset-forgotten-password',
  PRODUCTS_SINGLE_PRODUCT: '/api/products/single-product',
  // TODO: Temporary solution for order id Will be changed when submit order will be implemented
  ORDER_ID: '/api/order/order-id',
  USERS_ME_ADDRESSES: '/api/me/address',
  LINE_ITEM: '/api/lineItem',
  GIFT_CARD: '/api/me/spendingAccounts',
  ORDERS: '/api/me/orders',
  SPENDING_ACCOUNTS: '/api/spending-accounts',
  LIST_CART_PAYMENTS: '/api/cart/payments',
  SHIPPING: '/api/shipping',
  USER_GROUP: '/api/me/userGroup',
  MY_ORDERS: '/api/orders',
  CALCULATE_CART: '/api/cart/calculate',
};

export const MIDDLEWARE_URL = process.env.NEXT_PUBLIC_MIDDLEWARE_URL;

export const MIDDLEWARE_API_ENDPOINTS = {
  PRODUCT_ATTRIBUTES: `${MIDDLEWARE_URL}/api/products/productAttributes`,
  CART_PRODUCT_DETAILS: `${MIDDLEWARE_URL}/api/products/cartProductDetails`,
  VALIDATE_ADDRESS: `${MIDDLEWARE_URL}/api/easypost/validateaddress`,
  USERS_ME_ADDRESS: `${MIDDLEWARE_URL}/api/me/saveAddress`,
  GIFT_CERTIFICATE_BALANCE: `${MIDDLEWARE_URL}/api/spendingAccounts`,
  REISSUE_GIFT_CERTIFICATE: `${MIDDLEWARE_URL}/api/giftCard/reissueGiftCardEmail`,
  AUTOSHIP: `${MIDDLEWARE_URL}/api/user/autoShip`,
  NEWSLETTER_SUBSCRIPTION: `${MIDDLEWARE_URL}/api/send/addSubscriber`,
  FORGOTTEN_USERNAME: `${MIDDLEWARE_URL}/api/messagesender/ForgottenUsername`,
  RESET_PASSWORD: `${MIDDLEWARE_URL}/api/BuyerAccount/resetPassword`,
};

export const GRAPHQL_API_ENDPOINTS = {
  WAREHOUSE_LOCATIONS: '/api/graphql/warehouse',
  REGION_CODES: '/api/graphql/regionCodes',
};

export const GENERIC_FORM = {
  CART_SUBMIT: '/api/cart/submit',
};
