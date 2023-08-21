import { Placeholder, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS, GENERIC_FORM } from 'constants/endpoints';
import client from 'data/client';
import useLocalStorage from 'hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { genericFormDynamicValue } from 'data/atoms/genericForm';
import { GenericFormProps } from './GenericForm.type';
import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslate } from 'hooks/useTranslate';
import ErrorList from 'core/atoms/ErrorList/ErrorList';
import { FormValidationContext } from './FormContext';
import { LocalStorage } from 'data/atoms/localStorage';
import { mapLocalStorageToSubmitCart } from 'src/schemas/cart';
import { useUser } from 'data/user';
import { validJSON } from 'utils/validJSON';
import { setCookie } from 'cookies-next';
import { setToken } from 'utils/auth-utils';
import { ORDER_ID } from 'config/index';
import { useUserByXpProperty } from 'hooks/useUserBy/useUserBy';

const getEndpoint = (endpoint: string) => {
  const isNextJs = Object.values(API_ENDPOINTS).some((url) => url.endsWith(endpoint));
  const normalized = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const requestUrl = isNextJs
    ? normalized
    : `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/${normalized}`;
  return requestUrl;
};
export const GenericForm = (props: GenericFormProps) => {
  const { validationSchema } = useContext(FormValidationContext);
  const { isAuthenticated } = useUser();
  const [dynamicValue] = useAtom(genericFormDynamicValue);
  const [, setStorageValue] = useLocalStorage('GENERIC_FORMS');
  const router = useRouter();
  const methods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(!!validationSchema && { resolver: yupResolver<any>(validationSchema) }),
  });
  const { mutate: getSiteName } = useUserByXpProperty('ReplicatorSiteName', {
    onSuccess: (data: UserInfo | undefined) => {
      if (data) {
        setErrorMessages([t('FieldRep_Replicator_SiteNameIsTaken')]);
      } else {
        confirmAction();
      }
    },
  });
  const { mutate } = useMutation(
    (input: { endpoint: string; data?: unknown }) =>
      client.genericForm.submit(input.endpoint, input.data),
    {
      onSuccess: async (value: unknown) => {
        const onSuccess = getOnSuccess();
        onSuccess(value);
        router.push(successCallback);
      },
      onError: () => {
        router.push(errorCallback);
      },
    }
  );
  const { fields, rendering, params } = props || {};
  const rawEndpoint = (fields?.ApiEndpoint?.fields?.Value as { value?: string })?.value || '';
  const endpoint = getEndpoint(rawEndpoint);
  const getMutateArgs = () => {
    if (endpoint.endsWith(GENERIC_FORM.CART_SUBMIT)) {
      return {
        endpoint,
        data: isAuthenticated
          ? {}
          : mapLocalStorageToSubmitCart(
              Object.fromEntries(
                Object.entries(window.localStorage).map(([key, item]: [string, string]) => [
                  key,
                  validJSON(item) ? JSON.parse(item) : item,
                ])
              ) as LocalStorage
            ),
      };
    }
    return {
      endpoint,
      data: methods.getValues(),
    };
  };
  const getOnSuccess = (): ((...args: unknown[]) => void) => {
    if (endpoint.endsWith(GENERIC_FORM.CART_SUBMIT)) {
      return (values: { accessToken?: string; refreshToken?: string; OrderId: string }) => {
        setCookie(ORDER_ID, values.OrderId);
        if (values.accessToken) {
          setToken(values.accessToken, values.refreshToken);
        }
      };
    }
    return () => void 0;
  };
  const buttonText = String(fields?.Title?.value)?.replace('{{Placeholder}}', dynamicValue);
  const buttonTitle = { ...cloneDeep(fields?.Title), value: buttonText };
  const successCallback = fields?.SuccessCallback?.value?.href || router.asPath;
  const errorCallback = fields?.ErrorCallback?.value?.href || router.asPath;
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { t } = useTranslate();

  const checkSiteName = () => {
    if ('siteName' in methods.getValues()) {
      getSiteName(methods.getValues()['siteName'].name);
      return true;
    }
    return false;
  };

  const confirmAction = () => {
    setStorageValue((value: object) => ({
      ...value,
      [String(rendering?.uid)]: methods.getValues(),
    }));
    mutate(getMutateArgs());
  };
  const onSubmit = async () => {
    setErrorMessages([]);
    if (!checkSiteName()) {
      confirmAction();
    }
  };
  const onInvalid = async () => {
    await methods.trigger();
    const messages = Object.values(methods.formState.errors).flatMap((error) =>
      Object.values(error as FieldErrors).map((err) => {
        return t(err?.message as string) || (err?.message as string);
      })
    );
    setErrorMessages(messages);
  };

  return (
    <FormProvider {...methods}>
      {errorMessages.length > 0 && (
        <ErrorList errors={errorMessages} className="container"></ErrorList>
      )}
      <Form>
        <Placeholder name="jss-form" rendering={rendering} />
        <div className={`text-${params?.CtaAlignment} py-4`}>
          <Button
            variant="primary"
            type="button"
            onClick={methods.handleSubmit(onSubmit, onInvalid)}
          >
            <Text field={buttonTitle} />
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
