import { useQuery } from '@tanstack/react-query';
import useLocalStorage from 'hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { API_ENDPOINTS } from 'constants/endpoints';
import axios, { AxiosResponse } from 'axios';
import { STALE_TIME_DEFAULT } from 'constants/query-config';
import { getRealnameValid } from 'services/users.service';
import { omit } from 'lodash';
import { useState } from 'react';
import { REALNAME } from 'constants/query-key';

type RealnameResponse = AxiosResponse<Awaited<ReturnType<typeof getRealnameValid>>>;
export const useFieldRep = () => {
  const router = useRouter();
  const [fieldRep, setFieldRep] = useLocalStorage<string | undefined>('FIELD_REP');
  const [isRealnameValid, setIsRealnameValid] = useState(false);
  const [routerIsReady, setRouterIsReady] = useState(false);
  const redirectWithoutRealname = () => {
    const { pathname } = router;
    router.replace({ pathname, query: omit(router.query, [REALNAME]) }, undefined);
  };

  const realname =
    router.isReady && router.query?.realname?.toString()
      ? router.query?.realname?.toString()
      : router.isReady
      ? fieldRep
      : undefined;

  const { isLoading } = useQuery(
    [API_ENDPOINTS.USERS_REALNAME, realname],
    async () =>
      await axios.get(API_ENDPOINTS.USERS_REALNAME, {
        params: { realname },
      }),
    {
      staleTime: STALE_TIME_DEFAULT,
      enabled: realname !== undefined,
      onSuccess: ({ data }: RealnameResponse) => {
        let tmpIsRealnameValid = false;
        if ('valid' in data && data.valid) {
          tmpIsRealnameValid = true;
        }

        setIsRealnameValid(tmpIsRealnameValid);
        setFieldRep(tmpIsRealnameValid ? realname : undefined);
        setRouterIsReady(true);
        redirectWithoutRealname();
      },
    }
  );

  if (router.isReady && realname === undefined && !routerIsReady) {
    setRouterIsReady(true);
    setFieldRep(undefined);
    redirectWithoutRealname();
  }

  return {
    isLoading: realname !== undefined ? isLoading : false,
    routerIsReady,
    isRealnameValid,
  };
};
