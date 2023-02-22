import { VALIDATORS_V3_URL } from 'consts';
import { api } from './serviceApi';

export interface ValidatorMetricsProps {
  operatorAddr: string;
  moniker: string;
  year: number;
  quarter: number;
  isActive: boolean;
  isVerified: boolean;
  votingMetric: {
    count: number;
    total: number;
  };
  uptimeMetrics: {
    count: number;
    total: number;
  };
}

export const validatorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getValidatorMetrics: builder.query<
      ValidatorMetricsProps,
      {
        address: string;
        year: number;
        quarter: 1 | 2 | 3 | 4;
      }
    >({
      query: ({ address, year, quarter }) =>
        `${VALIDATORS_V3_URL}/${address}/metrics?year=${year}&quarter=${quarter}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetValidatorMetricsQuery } = validatorsApi;
