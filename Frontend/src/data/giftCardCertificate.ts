import client from './client';
import { useRouter } from 'next/router';
import { useError } from 'hooks/useError';
import { useMutation } from '@tanstack/react-query';

export const useReIssueGiftCertificate = (url: string) => {
  const { serverError, setServerError } = useError();
  const router = useRouter();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    client.giftCertificate.reIssueGiftCertificate,
    {
      onSuccess: () => {
        router.push(url as string);
      },
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};
