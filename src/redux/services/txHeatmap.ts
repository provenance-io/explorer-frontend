import { TX_HEATMAP_URL } from '../../consts';
import { api } from './serviceApi';

export interface DayOfData {
  data: {
    hour: number;
    numberTxs: number;
  }[];
  day: string;
  dow: number;
}

export interface DailyTotal {
  day: string;
  numberTxs: number;
}

export interface HourlyTotal {
  hour: number;
  numberTxs: number;
}

interface TxHeatmapProps {
  dailyTotal: DailyTotal[];
  heatmap: DayOfData[];
  hourlyTotal: HourlyTotal[];
}

export const txHeatmapApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTxHeatmapData: builder.query<TxHeatmapProps, void>({
      query: () => TX_HEATMAP_URL,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTxHeatmapDataQuery } = txHeatmapApi;
