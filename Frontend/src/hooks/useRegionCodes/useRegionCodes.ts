import client from 'data/client';
import { useQuery } from '@tanstack/react-query';
import { GRAPHQL_API_ENDPOINTS } from 'constants/endpoints';

const useRegionCodes = (props: {
  onSuccess?: (data: RegionItem[]) => void;
  onSettled?: () => void;
}) => {
  return useQuery({
    queryKey: [GRAPHQL_API_ENDPOINTS.REGION_CODES],
    queryFn: client.graphql.regionCodes,
    retry: 0,
    onSuccess: props.onSuccess,
    onSettled: props.onSettled,
  });
};

export default useRegionCodes;
