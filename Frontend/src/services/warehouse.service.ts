import { getEnv } from 'config/get-env';
import request, { gql } from 'graphql-request';
import { WAREHOUSE_QUERY_KEY } from 'constants/query-key';

const HOST = getEnv('SITECORE_API_HOST');
const SITECORE_KEY = getEnv('SITECORE_API_KEY');

const endpoint = `${HOST}/sitecore/api/graph/edge?sc_apikey={${SITECORE_KEY}}`;

export const getWarehouseLocations = async (): Promise<WareHouseItem[]> => {
  const { item: res } = await request<WarehouseRequest>(
    endpoint,
    gql`
      query {
        item(path: "${WAREHOUSE_QUERY_KEY}", language: "en") {
          id
          name
          children (first: 100) {
            total
            results {
              ... on Warehouse{
                warehouseID {
                  value
                }
                city {
                  value
                }
                state {
                  value
                }
                description {
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
