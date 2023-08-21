import { useQuery } from '@tanstack/react-query';
import { STALE_TIME_LONG } from 'constants/query-config';
import { API_ENDPOINTS } from 'constants/endpoints';
import client from './client';
import { FieldRepApplication } from './atoms/localStorage/fieldRepApplication';
import { useForm } from 'react-hook-form';
import useLocalStorage from 'hooks/useLocalStorage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useI18n } from 'next-localization';
export type FieldRepApplicationFields = {
  selectedOptionalProduct: string | undefined | null;
  termsAndConditions: string | undefined | null;
};
const fieldRepApplicationSchema = (requiredMessages: {
  selectedOptionalProduct: string;
  termsAndConditions: string;
}) =>
  yup.object().shape({
    selectedOptionalProduct: yup.string().required(requiredMessages.selectedOptionalProduct),
    termsAndConditions: yup.boolean().isTrue(requiredMessages.termsAndConditions),
  });

export const useFieldRepCart = (props: { mandatoryProductId?: string; productIds: string[] }) => {
  const { t } = useI18n();
  const form = useForm<FieldRepApplicationFields>({
    resolver: yupResolver(
      fieldRepApplicationSchema({
        selectedOptionalProduct: t('StarterKitSelection_Error'),
        termsAndConditions: '*',
      })
    ),
  });
  const products = props.productIds.reduce((acc, item) => `${acc}|${item}`, '');
  const query = useQuery(
    [API_ENDPOINTS.CART_ITEMS, 'fieldRep'],
    () => client.cart.getCartItems({ products }),
    {
      staleTime: STALE_TIME_LONG,
    }
  );
  const [, setLocalStorage] = useLocalStorage<FieldRepApplication>('FIELD_REP_APPLICATION');
  const saveToLocalstorage = () => {
    setLocalStorage({ selectedOptionalProduct: form.getValues().selectedOptionalProduct });
  };
  const mandatoryProduct = query.data?.items?.find((item) => item.id === props.mandatoryProductId);
  const optionalProducts = query.data?.items?.filter(
    (item) => item.id !== props.mandatoryProductId
  );

  return {
    ...query,
    mandatoryProduct,
    optionalProducts,
    saveToLocalstorage,
    form,
  };
};
