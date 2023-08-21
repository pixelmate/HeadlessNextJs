import { getEnv } from 'config/get-env';
import request, { gql } from 'graphql-request';
import { REGIONCODES_QUERY_KEY } from 'constants/query-key';

const HOST = getEnv('SITECORE_API_HOST');
const SITECORE_KEY = getEnv('SITECORE_API_KEY');

const endpoint = `${HOST}/sitecore/api/graph/edge?sc_apikey={${SITECORE_KEY}}`;

export const getRegionCodes = async (): Promise<RegionItem[]> => {
  const { item: res } = await request<RegionCodesRequest>(
    endpoint,
    gql`
      query {
        item(path: "${REGIONCODES_QUERY_KEY}", language: "en") {
          id
          name
          children(first: 200) {
            total
            results {
              ... on Region {
                code {
                  value
                }
                group {
                  value
                }
                name_c1d60e037d5a4c45a67b498684d40990 {
                  value
                }
              }
            }
          }
        }
      }
    `
  );
  return res.children.results;
};
