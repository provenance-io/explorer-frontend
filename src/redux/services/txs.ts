import { TX_V3_URL } from 'consts';
import qs from 'query-string';
import { api } from './serviceApi';

interface TxHistoryProps {
  date: number;
  feepayer: string | null;
  txCount: 928;
  feeAmountInBaseToken: number;
  gasWanted: number;
  gasUsed: number;
  feeAmountInToken: number;
  feesPaidInUsd: number | null;
  maxTokenPriceUsd: number | null;
  minTokenPriceUsd: number | null;
  avgTokenPriceUsd: number | null;
}

export const txsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGrants: builder.query<
      AuthzGrantee | FeeGrantGrantee,
      {
        grant: 'feegrant' | 'authz';
        type: 'grantee' | 'granter';
        address: string;
        page?: number;
        count?: number;
      }
    >({
      query: ({ grant, type, address, page = 1, count = 10 }) =>
        `${
          grant === 'authz' ? GRANTS_AUTHZ_URL : GRANTS_FEEGRANT_URL
        }/${address}/${type}?${qs.stringify({ page, count })}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGrantsQuery } = txsApi;
