import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const FetchCategoryResults = (url: string) => {
  const { isLoading, isError, error, data } = useQuery(['category'], async () => {
    const response = await axios.get(url);
    return response.data;
  });
  return { data, error, isError, isLoading };
};
