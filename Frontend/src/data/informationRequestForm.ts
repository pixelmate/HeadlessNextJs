import { useMutation } from '@tanstack/react-query';
import client from './client';
import { useError } from 'hooks/useError';
import { useRouter } from 'next/router';

export function useInformationRequestForm(url: string) {
  const router = useRouter();
  const { serverError, setServerError } = useError();

  const { mutate, data, isLoading, isSuccess } = useMutation(
    client.informationRequest.getInformationRequest,
    {
      onSuccess: () => {
        router.push(url);
      },
      onError: setServerError,
    }
  );

  return { mutate, data, isLoading, serverError, isSuccess };
}
