import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/store';
import { UTILITY_TOKEN_CURRENT_URL, UTILITY_TOKEN_HISTORICAL_URL } from '../../../consts';
import { ajax } from '../api';

export interface HistoricalPricing {
  quote: {
    [key: string]: {
      close: number;
      high: number;
      low: number;
      market_cap: number;
      open: number;
      timestamp: string; //2022-09-06T17:35:57.042Z
      volume: number;
    };
  };
  time_close: string; // 2022-09-06T17:35:57.042Z
  time_high: string; // 2022-09-06T17:35:57.042Z
  time_low: string; // 2022-09-06T17:35:57.042Z
  time_open: string; // 2022-09-06T17:35:57.042Z
}

interface CurrentPricing {
  circulating_supply: number;
  cmc_rank: number;
  date_added: string; //2022-09-06T17:38:29.798Z
  id: number;
  is_active: boolean;
  is_fiat: boolean;
  last_updated: string; //2022-09-06T17:38:29.798Z
  max_supply: number;
  name: string;
  num_market_pairs: number;
  platform: number;
  quote: {
    [key: string]: {
      fully_diluted_market_cap: number;
      last_updated: string; //2022-09-06T17:38:29.798Z
      market_cap: number;
      market_cap_by_total_supply: number;
      market_cap_dominance: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_7d: number;
      percent_change_90d: number;
      price: number;
      tvl: number;
      volume_24h: number;
      volume_24h_reported: number;
      volume_30d: number;
      volume_30d_reported: number;
      volume_7d: number;
      volume_7d_reported: number;
      volume_change_24h: number;
    };
  };
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
  slug: string;
  symbol: string;
  tags: string[];
  tvl_ratio: number;
}

interface OrderbookState {
  historicalPricing: HistoricalPricing[];
  historicalPricingLoading: boolean;
  historicalPricingFailed: boolean;
  currentPricing: CurrentPricing;
  currentPricingLoading: boolean;
  currentPricingFailed: boolean;
}

export const initialState: OrderbookState = {
  historicalPricing: [],
  historicalPricingLoading: false,
  historicalPricingFailed: false,
  currentPricing: {
    circulating_supply: 0,
    cmc_rank: 0,
    date_added: '',
    id: 0,
    is_active: false,
    is_fiat: false,
    last_updated: '',
    max_supply: 0,
    name: '',
    num_market_pairs: 0,
    platform: 0,
    quote: {},
    self_reported_circulating_supply: 0,
    self_reported_market_cap: 0,
    slug: '',
    symbol: '',
    tags: [],
    tvl_ratio: 0,
  },
  currentPricingLoading: false,
  currentPricingFailed: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_HISTORICAL_PRICING = 'ORDERBOOK::GET_HISTORICAL_PRICING';
export const GET_CURRENT_PRICING = 'ORDERBOOK::GET_CURRENT_PRICING';

/* -----------------
** ACTIONS
-------------------*/
export const getCurrentPricing = createAsyncThunk(GET_CURRENT_PRICING, () =>
  ajax({
    url: `${UTILITY_TOKEN_CURRENT_URL}`,
  })
);

// Date format: "2000-10-31"
export const getHistoricalPricing = createAsyncThunk(
  GET_HISTORICAL_PRICING,
  ({ startTime = '', endTime = '' }: { startTime: string; endTime: string }) =>
    ajax({
      url: `${UTILITY_TOKEN_HISTORICAL_URL}${startTime || endTime ? '?' : ''}${
        startTime ? `fromDate=${startTime}` : ''
      }${startTime && endTime ? '&' : ''}${endTime ? `&toDate=${endTime}` : ''}`,
    })
);

export const orderbookActions = {
  getHistoricalPricing,
  getCurrentPricing,
};
/* -----------------
** SLICE
-------------------*/
export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
    GET_HISTORICAL_PRICING
    -------------------*/
      .addCase(getHistoricalPricing.pending, (state) => {
        state.historicalPricingLoading = true;
        state.historicalPricingFailed = false;
      })
      .addCase(getHistoricalPricing.fulfilled, (state, { payload }) => {
        state.historicalPricingLoading = false;
        state.historicalPricing = payload.data.map((item: HistoricalPricing) => {
          item.time_close = new Date(item.time_close).toISOString();
          return { ...item };
        });
        state.historicalPricingFailed = false;
      })
      .addCase(getHistoricalPricing.rejected, (state) => {
        state.historicalPricingLoading = false;
        state.historicalPricingFailed = true;
      })
      /* -----------------
    GET_CURRENT_PRICING
    -------------------*/
      .addCase(getCurrentPricing.pending, (state) => {
        state.currentPricingLoading = true;
        state.currentPricingFailed = false;
      })
      .addCase(getCurrentPricing.fulfilled, (state, { payload }) => {
        state.currentPricingLoading = false;
        state.currentPricing = payload.data;
        state.currentPricingFailed = false;
      })
      .addCase(getCurrentPricing.rejected, (state) => {
        state.currentPricingLoading = false;
        state.currentPricingFailed = true;
      });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectOrderbook = (state: RootState) => state.orderbook;

export default orderbookSlice.reducer;
