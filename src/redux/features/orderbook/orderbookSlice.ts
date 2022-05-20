import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/app/store";
import { ORDER_BOOK_URL, ORDER_BOOK_VOLUME_URL } from 'consts';
import { ajax } from "../api";

interface DailyPrice {
  ask: number;
  base_currency: string;
  base_volume: number;
  bid: number;
  high: number;
  last_price: number;
  low: number;
  target_currency: string;
  target_volume: number;
  ticker_id: string;
};

export interface PriceHistory {
  base_volume: number;
  price: number;
  target_volume: number;
  trade_id: number;
  trade_timestamp: string | number; // Comes as epoch number, converted to string
  type: string;
};

interface DailyVolume {
  contractAddress: string;
  volumeTraded: string;
  displayVolumeTraded: string;
  highPricePerUnit: string;
  highDisplayPricePerDisplayUnit: string;
  lowPricePerUnit: string;
  lowDisplayPricePerDisplayUnit: string;
  latestPricePerUnit: string;
  latestDisplayPricePerDisplayUnit: string;
};

interface OrderbookState {
  dailyPrice: DailyPrice,
  dailyPriceFailed: boolean;
  dailyPriceLoading: boolean;
  priceHistory: PriceHistory[],
  priceHistoryFailed: boolean;
  priceHistoryLoading: boolean;
  dailyVolume: DailyVolume["displayVolumeTraded"];
  dailyVolumeLoading: boolean;
};

export const initialState: OrderbookState = {
  dailyPrice: {
    ask: 0,
    base_currency: "",
    base_volume: 0,
    bid: 0,
    high: 0,
    last_price: 0,
    low: 0,
    target_currency: "",
    target_volume: 0,
    ticker_id: "",
  },
  dailyPriceFailed: false,
  dailyPriceLoading: false,
  priceHistory: [],
  priceHistoryFailed: false,
  priceHistoryLoading: false,
  dailyVolume: "",
  dailyVolumeLoading: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_DAILY_PRICE = 'ORDERBOOK::GET_DAILY_PRICE';
export const GET_PRICE_HISTORY = 'ORDERBOOK::GET_PRICE_HISTORY';
export const GET_DAILY_VOLUME = 'ORDERBOOK::GET_DAILY_VOLUME';

/* -----------------
** ACTIONS
-------------------*/
export const getDailyPrice = createAsyncThunk(
  GET_DAILY_PRICE,
  () =>
    ajax({
      url: `${ORDER_BOOK_URL}/tickers`,
    })
);

export const getPriceHistory = createAsyncThunk(
  GET_PRICE_HISTORY,
  ({
    start_time = '', 
    end_time = '',
  } : {
    start_time: string,
    end_time: string,
  }) =>
    ajax({
      url: `${ORDER_BOOK_URL}/historical_trades?ticker_id=HASH_USD&type=buy${start_time && `&start_time=${start_time}`}${end_time && `&end_time=${end_time}`}`,
    })
);

export const getDailyVolume = createAsyncThunk(
  GET_DAILY_VOLUME,
  () =>
    ajax({
      url: ORDER_BOOK_VOLUME_URL,
    })
);

export const orderbookActions = {
  getDailyPrice,
  getPriceHistory,
  getDailyVolume,
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
    GET_DAILY_PRICE
    -------------------*/
    .addCase(getDailyPrice.pending, (state) => {
      state.dailyPriceLoading = true;
      state.dailyPriceFailed = false;
    })
    .addCase(getDailyPrice.fulfilled, (state, { payload }) => {
      state.dailyPriceLoading = false;
      state.dailyPriceFailed = false;
      state.dailyPrice = payload.data.find((ticker: DailyPrice) => ticker.ticker_id === 'HASH_USD');
    })
    .addCase(getDailyPrice.rejected, (state) => {
      state.dailyPriceLoading = false;
      state.dailyPriceFailed = true;
    })
    /* -----------------
    GET_PRICE_HISTORY
    -------------------*/
    .addCase(getPriceHistory.pending, (state) => {
      state.priceHistoryLoading = true;
      state.priceHistoryFailed = false;
    })
    .addCase(getPriceHistory.fulfilled, (state, { payload }) => {
      state.priceHistoryLoading = false;
      state.priceHistoryFailed = false;
      state.priceHistory = payload.data.buy.map((item: PriceHistory) => {
        // Convert epoch seconds to ISO time format
        item.trade_timestamp = new Date((item.trade_timestamp as number) * 1000).toISOString();
        return { ...item };
      });
    })
    .addCase(getPriceHistory.rejected, (state) => {
      state.priceHistoryLoading = false;
      state.priceHistoryFailed = true;
    })
    /* -----------------
    GET_DAILY_VOLUME
    -------------------*/
    .addCase(getDailyVolume.pending, (state) => {
      state.dailyVolumeLoading = true;
    })
    .addCase(getDailyVolume.fulfilled, (state, { payload }) => {
      state.dailyVolumeLoading = false;
      state.dailyVolume = payload.data.displayVolumeTraded;
    })
    .addCase(getDailyVolume.rejected, (state) => {
      state.dailyVolumeLoading = false;
    });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectOrderbook = (state: RootState) => state.orderbook;

export default orderbookSlice.reducer;