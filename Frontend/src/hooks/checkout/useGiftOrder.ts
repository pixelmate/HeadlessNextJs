import useLocalStorage from 'hooks/useLocalStorage';
import isNil from 'lodash/isNil';
import toArray from 'lodash/toArray';
import { useGetCart, useUpdateGiftCartMessage } from 'data/cart';
import { GiftOrderForm } from 'data/atoms/localStorage/checkoutMultistepForm';
import { MAX_GIFT_ORDER_MESSAGE_LENGTH } from 'constants/giftOrder';
import { SetStateAction, useState } from 'react';
import { useUser } from 'data/user';
export type EditMode = 'localstorage' | 'draft';
export const useGiftOrder = () => {
  const { mutate } = useUpdateGiftCartMessage();
  const [value, _setValue] = useLocalStorage<GiftOrderForm>('GIFT_ORDER_FORM');
  const [draftValue, setDraftValue] = useState<GiftOrderForm>({ ...value });
  const { isAuthenticated } = useUser();

  const setValue = (value: SetStateAction<GiftOrderForm>) => {
    _setValue(value);
    setDraftValue(value);
  };

  useGetCart({
    onSuccess: (data) => {
      if (
        (!isNil(data?.xp?.giftOrderMessage) || !isNil(data?.xp?.isGiftOrder)) &&
        !value?.touched
      ) {
        setValue((old: GiftOrderForm) => ({
          giftOrderMessage: String(data?.xp?.giftOrderMessage || ''),
          isGiftOrder: Boolean(data?.xp?.isGiftOrder),
          touched: old?.touched,
        }));
      }
    },
  });

  const setIsGiftOrder = (value: boolean, isDraft = false) => {
    if (isDraft) {
      setDraftValue((old: GiftOrderForm) => ({
        ...old,
        isGiftOrder: value,
        touched: true,
      }));
      return;
    }
    setValue((old: GiftOrderForm) => ({ ...old, isGiftOrder: value, touched: true }));
  };

  const setGiftOrderMessage = (msg: string, isDraft = false) => {
    if (isDraft) {
      setDraftValue((old: GiftOrderForm) => ({
        ...old,
        giftOrderMessage: msg,
        touched: true,
      }));
      return;
    }
    setValue((old: GiftOrderForm) => ({
      ...old,
      giftOrderMessage: msg,
      touched: true,
    }));
  };

  const submitForm = (giftProps?: GiftOrderForm) => {
    mutate({
      giftOrderMessage: giftProps?.giftOrderMessage || value?.giftOrderMessage,
      isGiftOrder: giftProps?.isGiftOrder || value?.isGiftOrder,
    });
  };

  const saveDraftToLocalStorage = () => {
    setValue(draftValue);
    isAuthenticated && submitForm(draftValue);
  };

  const giftMessageLength = toArray(value?.giftOrderMessage || '').length;
  const draftGiftMessageLength = toArray(draftValue?.giftOrderMessage || '').length;
  const messageLettersLeft = MAX_GIFT_ORDER_MESSAGE_LENGTH - giftMessageLength;
  const draftMessageLettersLeft = MAX_GIFT_ORDER_MESSAGE_LENGTH - draftGiftMessageLength;
  return {
    value,
    draftValue,
    giftMessageLength,
    draftGiftMessageLength,
    draftMessageLettersLeft,
    messageLettersLeft,
    setGiftOrderMessage,
    setIsGiftOrder,
    submitForm,
    saveDraftToLocalStorage,
  };
};
