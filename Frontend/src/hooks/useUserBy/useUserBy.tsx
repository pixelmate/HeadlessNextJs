import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from 'constants/endpoints';
import { STALE_TIME_DEFAULT } from 'constants/query-config';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import client from 'data/client';
import useLocalStorage from 'hooks/useLocalStorage';
import { useAtom } from 'jotai';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';
import { Searchable } from 'ordercloud-javascript-sdk';
import { useState } from 'react';
import { getUserByParam, getUserByXpProperty } from 'services/users.service';

type UserByXpPropertyAndRealnameResponse = AxiosResponse<
  Awaited<ReturnType<typeof getUserByXpProperty>>
>;
export const useUserByXpPropertyAndRealname = (property: keyof UserXp) => {
  const router = useRouter();
  const [fieldRep, setFieldRep] = useLocalStorage<string | undefined>('FIELD_REP');
  const [sponsor, setSponsor] = useState<UserInfo | undefined>(undefined);
  const [routerIsReady, setRouterIsReady] = useState(false);

  const realname =
    router.isReady && router.query?.realname?.toString()
      ? router.query?.realname?.toString()
      : router.isReady
      ? fieldRep
      : undefined;

  const { isLoading } = useQuery(
    [API_ENDPOINTS.USERS_USER_BY_XP_PROPERTY, { value: realname }],
    () => client.users.getUserByXpProperty({ value: realname, property }),
    {
      staleTime: STALE_TIME_DEFAULT,
      enabled: realname !== undefined,
      onSuccess: (data: UserByXpPropertyAndRealnameResponse) => {
        setRouterIsReady(true);
        let tmpRealname: string | undefined = undefined;
        let tmpSponsor: UserInfo | undefined = undefined;
        if (data && !('status' in data)) {
          tmpRealname = realname;
          tmpSponsor = data;
        }
        setFieldRep(tmpRealname);
        setSponsor(tmpSponsor);
      },
    }
  );

  if (router.isReady && !routerIsReady && realname === undefined) {
    setFieldRep(undefined);
    setRouterIsReady(true);
  }

  return {
    isLoading: realname !== undefined ? isLoading : false,
    sponsor,
    routerIsReady,
    realname,
  };
};

type UserByXpPropertyResponse = AxiosResponse<Awaited<ReturnType<typeof getUserByXpProperty>>>;
export const useUserByXpProperty = (
  property: keyof UserXp,
  props: { onSuccess?: (data: UserInfo | undefined) => void }
) => {
  return useMutation(
    [API_ENDPOINTS.USERS_USER_BY_XP_PROPERTY],
    (searchValue: string) => client.users.getUserByXpProperty({ value: searchValue, property }),
    {
      onSuccess: (data: UserByXpPropertyResponse) => {
        let tmpSponsor: UserInfo | undefined = undefined;
        if (data && !('status' in data)) {
          tmpSponsor = data;
        }
        if (props?.onSuccess) {
          props?.onSuccess(tmpSponsor);
        }
      },
    }
  );
};

type UserByParamManuallyResponse = AxiosResponse<Awaited<ReturnType<typeof getUserByParam>>>;
export function useUserByParamManually(props: {
  onSuccess: (data: UserInfo | undefined) => void;
  onError?: () => void;
}) {
  const { t } = useI18n();
  const [, setSpinner] = useAtom(spinnerAtom);
  return useMutation(
    [API_ENDPOINTS.USERS_USER_BY_PARAM],
    (payload: { search: string; param: Searchable<'Users.List'>[number] }) =>
      client.users.getUserByParamManually(payload),
    {
      onMutate: () => {
        setSpinner(createSpinner(t('Common_Loading')));
      },
      onSuccess: (data: UserByParamManuallyResponse) => {
        let user: UserInfo | undefined = undefined;
        if (data && !('status' in data)) {
          user = data;
        }
        props.onSuccess(user);
      },
      onSettled: () => {
        setSpinner(null);
      },
      onError: props.onError,
    }
  );
}
