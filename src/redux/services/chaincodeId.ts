import { CHAINCODE_ID_URL, CHAINCODE_PREFIXES_URL } from 'consts';
import { api } from './serviceApi';

interface ChaincodePrefix {
  prefix: string;
  type: string;
}

export const chaincodeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChaincodeId: builder.query<string, void>({
      query: () => ({
        url: `${CHAINCODE_ID_URL}`,
        responseHandler: (response) => response.text(),
      }),
    }),
    getChaincodePrefixes: builder.query<ChaincodePrefix, void>({
      query: () => ({
        url: `${CHAINCODE_PREFIXES_URL}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetChaincodeIdQuery, useGetChaincodePrefixesQuery } = chaincodeApi;
