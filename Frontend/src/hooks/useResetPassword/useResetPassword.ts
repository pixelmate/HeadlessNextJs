import { useMutation } from '@tanstack/react-query';
import { MIDDLEWARE_API_ENDPOINTS } from 'constants/endpoints';
import { useAtom } from 'jotai';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseJwt } from 'utils/auth-utils';
import client from 'data/client';

export const useResetPassword = (redirectOnSuccessUrl: string) => {
  const { t } = useI18n();
  const [, setSpinner] = useAtom(spinnerAtom);

  const [verificationCode, setVerificationCode] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const tmpVC = router?.query?.vc?.toString();
  const at = router?.query?.at?.toString();

  useEffect(() => {
    setSpinner(createSpinner(t('Common_Loading')));
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setUsername(parseJwt(at || '')?.usr || '');
      setVerificationCode(encodeURIComponent(tmpVC || ''));
      setSpinner(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tmpVC]);

  const { mutate: resetPassword } = useMutation(
    [MIDDLEWARE_API_ENDPOINTS.RESET_PASSWORD],
    async (payload: { password: string; username: string; verificationCode: string }) =>
      await client.users.resetPassword(payload),
    {
      onMutate: () => {
        setSpinner(createSpinner(t('Common_Loading')));
      },
      onSettled: () => {
        setSpinner(null);
      },
      onSuccess: () => {
        if (redirectOnSuccessUrl) {
          router.push(redirectOnSuccessUrl);
        }
      },
    }
  );

  return { resetPassword, verificationCode, username };
};
