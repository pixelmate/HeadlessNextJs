import { atom } from 'jotai';
import { GiftOrderForm, initialValueGiftOrderForm } from './checkoutMultistepForm';
import { GiftCertificate, initialValueGiftCertificate } from './giftCertificateInformation';
import { FieldRepApplication, initialValueFieldRepApplication } from './fieldRepApplication';
import { initialAutoshipUser } from './autoship';
import { PromoCode } from 'src/schemas/spending-accounts';

export type LocalStorage = {
  PRODUCTS_IN_CART: ProductDetailsType[];
  SHIPPING_ADDRESS: AddressItem | undefined;
  BILLING_ADDRESS: AddressItem | undefined;
  GIFT_CARDS: GiftCardItem | undefined;
  GIFT_ORDER_FORM: GiftOrderForm;
  GIFT_CERTIFICATE_INFORMATION: GiftCertificate;
  CART: XpAutoshipCart | undefined;
  USER: AutoshipUser | undefined;
  COMPLETED_STEP: number;
  SHIPPING_OPTION_DETAILS: ShippingOptionDetail | undefined;
  GENERIC_FORMS: { [key: string]: unknown };
  IS_NEW_USER: boolean;
  FIELD_REP: string | undefined;
  FIELD_REP_APPLICATION: FieldRepApplication | undefined;
  PROGRESS_URL: ProgressUrl | undefined;
  REDEMPTION_CODES: PromoCode[];
};

export type XpAutoshipCart = { xp: { IsAutoShipOrder: boolean } };
export type XpAutoshipUser = { xp: { IsAutoShip: boolean } };

export interface ProductDetailsType {
  productId: string;
  quantity: string;
  isAuthenticated: boolean;
}

const initialLocalStorage = {
  PRODUCTS_IN_CART: [],
  SHIPPING_ADDRESS: undefined,
  BILLING_ADDRESS: undefined,
  GIFT_CARDS: undefined,
  GIFT_ORDER_FORM: initialValueGiftOrderForm,
  GIFT_CERTIFICATE_INFORMATION: initialValueGiftCertificate,
  CART: undefined,
  USER: initialAutoshipUser,
  COMPLETED_STEP: 0,
  SHIPPING_OPTION_DETAILS: undefined,
  GENERIC_FORMS: {},
  IS_NEW_USER: false,
  FIELD_REP: undefined,
  FIELD_REP_APPLICATION: initialValueFieldRepApplication,
  PROGRESS_URL: undefined,
  REDEMPTION_CODES: [],
};

export const localStorageAtom = atom<LocalStorage>(initialLocalStorage);
