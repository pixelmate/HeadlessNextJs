import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import router from 'next/router';
import { API_ENDPOINTS } from 'constants/endpoints';
type FormValues = {
  email: string;
  message: string;
};
export const useContactUsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (formData: FormValues) => {
      await axios.post(API_ENDPOINTS.SUBSCRIPTION, formData);
    },
    {
      onSuccess: () => {
        router.push('contactSubmission');
      },
      onSettled: () => {
        queryClient.setQueryData(['contactUs'], '');
      },
    }
  );
};
