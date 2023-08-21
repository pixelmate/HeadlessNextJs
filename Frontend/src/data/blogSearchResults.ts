import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { STALE_TIME_DEFAULT } from 'constants/query-config';
import { useRouter } from 'next/router';

type filters = {
  author?: string;
  category?: [];
  tag?: [];
};

type BlogSearchProps = {
  data: {
    pageSize?: string;
    pageNumber?: number;
    filters?: filters;
  };
  apiEndpoint: string;
};

export const useBlogSearchResults = (params: BlogSearchProps) => {
  const {
    isReady,
    query: { tag, author, category },
  } = useRouter();
  const blogFilters = {
    author,
    category: category ? [category] : [],
    tag: tag ? [tag] : [],
  };

  const queryFootprint = Object.entries(blogFilters).reduce((acc, [, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      return [...acc, value.join('_')];
    }

    if (value !== null && value !== undefined && value.length > 0) {
      return [...acc, value];
    }

    return acc;
  }, []);

  const { isLoading, isError, error, data } = useQuery(
    ['blogSearchResults', params.data.pageNumber, ...queryFootprint],
    async () =>
      await axios.post(
        params.apiEndpoint,
        {
          ...params.data,
          filters: blogFilters,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    { staleTime: STALE_TIME_DEFAULT, keepPreviousData: true }
  );

  return { data, error, isError, isLoading: isLoading || !isReady };
};
