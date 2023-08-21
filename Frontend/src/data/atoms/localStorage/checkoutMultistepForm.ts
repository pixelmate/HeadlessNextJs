export type GiftOrderForm = {
  isGiftOrder: boolean;
  giftOrderMessage: string;
  touched?: boolean;
};

export const initialValueGiftOrderForm: GiftOrderForm = {
  isGiftOrder: false,
  giftOrderMessage: '',
  touched: false,
};
