import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MIDDLEWARE_API_ENDPOINTS } from 'constants/endpoints';
import client from './client';

export function useValidateAddress(props: {
  onSuccess?: () => void;
  onSettled: (data: ValidateAddressResponse) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation([MIDDLEWARE_API_ENDPOINTS.VALIDATE_ADDRESS], client.validate.address, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIDDLEWARE_API_ENDPOINTS.VALIDATE_ADDRESS] });
      props?.onSuccess?.();
    },
    onSettled: props.onSettled,
  });
}
