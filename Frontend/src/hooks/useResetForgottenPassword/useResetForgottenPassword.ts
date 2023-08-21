import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from 'constants/endpoints';
import client from 'data/client';

export function useResetForgottenPassword(props: { onSuccess: () => void }) {
  return useMutation(
    [API_ENDPOINTS.FORGOTTEN_PASSWORD],
    async (payload: { email: string; username: string; url: string }) =>
      await client.users.resetForgottenPassword(payload),
    {
      onSuccess: props.onSuccess,
    }
  );
}
