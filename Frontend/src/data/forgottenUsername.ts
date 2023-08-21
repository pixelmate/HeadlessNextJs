import { useMutation } from '@tanstack/react-query';
import client from './client';
import { useError } from 'hooks/useError';

export const useForgottenUsername = () => {
  const { serverError, setServerError } = useError();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    client.users.getForgottenUsername,
    {
      onError: (error: Error) => {
        setServerError(error);
      },
    }
  );

  return { mutate, isLoading, serverError, setServerError, isSuccess, isError, error };
};
