import { ACCOUNT_INFO_V3_URL, TX_V3_URL } from 'consts';
import qs from 'query-string';
import { api } from './serviceApi';

export type GranularityProps = 'MONTH' | 'DAY' | 'HOUR';

export interface TxHistoryProps {
  date: number;
  feepayer: string | null;
  txCount: number;
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
    getTxHistoryData: builder.query<
      TxHistoryProps[],
      {
        fromDate: string;
        toDate: string;
        granularity: GranularityProps;
        address?: string;
      }
    >({
      query: ({ fromDate, toDate, granularity, address = '' }) =>
        `${
          address ? `${ACCOUNT_INFO_V3_URL}/${address}/tx_history` : `${TX_V3_URL}/history`
        }?${qs.stringify({ fromDate, toDate, granularity })}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTxHistoryDataQuery } = txsApi;
