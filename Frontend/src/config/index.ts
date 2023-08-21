import { ApiRole, CookieOptions } from 'ordercloud-javascript-sdk';
import { getEnv } from './get-env';

export const LEFT_DRAWER_WIDTH = 280;
export const REFRESH_TOKEN = 'refresh_token';
export const PERMISSIONS = 'permissions';
export const AUTH_TOKEN = 'auth_token';
export const ORDER_ID = 'order_id';
export const ANONYMOUS_SCOPE: ApiRole[] = ['Shopper'];
export const CLIENT_SCOPE: ApiRole[] = [
  'BuyerUserReader',
  'MeAddressAdmin',
  'MeAdmin',
  'MeCreditCardAdmin',
  'MeXpAdmin',
  'OrderAdmin',
  'OverrideShipping',
  'OverrideUnitPrice',
  'PasswordReset',
  'ProductReader',
  'Shopper',
  'SpendingAccountReader',
];

export interface OcConfig {
  clientId: string;
  scope: ApiRole[];
  baseApiUrl?: string;
  allowAnonymous?: boolean;
  cookieOptions?: CookieOptions;
  catalogId: string;
}

const ocConfig: OcConfig = {
  clientId: getEnv('NEXT_PUBLIC_ORDERCLOUD_CLIENT_ID') as string,
  baseApiUrl: getEnv('NEXT_PUBLIC_ORDERCLOUD_API_ENDPOINT') as string,
  catalogId: getEnv('NEXT_PUBLIC_ORDERCLOUD_CATALOG_ID') as string,
  scope: CLIENT_SCOPE,
  allowAnonymous: false,
  cookieOptions: undefined,
};

export default ocConfig;
