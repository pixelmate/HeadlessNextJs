import axios from 'axios';
import { useState } from 'react';

export const useError = () => {
  const [serverError, setServerErrorMessage] = useState<string | undefined>();

  const setServerError = (error: Error) => {
    if (axios.isAxiosError(error)) {
      setServerErrorMessage((error.response?.data as { message: string }).message);
    } else {
      setServerErrorMessage('Server error');
    }
  };

  return { serverError, setServerError };
};
