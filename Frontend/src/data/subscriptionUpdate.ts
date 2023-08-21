import { useMutation } from '@tanstack/react-query';
import { useError } from 'hooks/useError';
import client from './client';
import { useRouter } from 'next/router';

export const useSubscriptionMutation = (url: string) => {
  const { serverError, setServerError } = useError();
  const router = useRouter();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    client.subscribe.subscribeToNewsletter,
    {
      onSuccess: () => {
        router.push(url);
      },
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );
  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};
