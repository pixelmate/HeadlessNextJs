import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { STALE_TIME_DEFAULT } from 'constants/query-config';

export const FetchSearchResults = (url: string, pageSize: number, pageNumber: number) => {
  let queryString;
  if (typeof location !== 'undefined') {
    queryString = (location !== undefined && location?.search) || '';
  }
  const searchParams = new URLSearchParams(queryString);
  const searchText = searchParams.get('searchtext') || '';

  const { isLoading, isError, error, data } = useQuery(
    ['searchResults', pageNumber],
    async () =>
      await axios.post(
        url,
        {
          searchText,
          pageSize,
          pageNumber,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    { staleTime: STALE_TIME_DEFAULT, keepPreviousData: true }
  );
  return { data, searchText, error, isError, isLoading };
};
