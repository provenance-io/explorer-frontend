import { handleActions } from 'redux-actions';
import { GET_DAILY_PRICE, GET_PRICE_HISTORY } from '../actions/orderbookActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  dailyPrice: {},
  dailyPriceFailed: false,
  dailyPriceLoading: false,
  priceHistory: [],
  priceHistoryFailed: false,
  priceHistoryLoading: false,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_DAILY_PRICE
    -------------------*/
    [`${GET_DAILY_PRICE}_${REQUEST}`](state) {
      return {
        ...state,
        dailyPrice: 0,
        dailyPriceFailed: false,
        dailyPriceLoading: true,
      };
    },
    [`${GET_DAILY_PRICE}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        dailyPrice: payload.find(ticker => ticker.ticker_id === 'HASH_USD'),
        dailyPriceLoading: false,
      };
    },
    [`${GET_DAILY_PRICE}_${FAILURE}`](state) {
      return {
        ...state,
        dailyPriceFailed: true,
        dailyPriceLoading: false,
      };
    },
    /* -----------------
    GET_PRICE_HISTORY
    -------------------*/
    [`${GET_PRICE_HISTORY}_${REQUEST}`](state) {
      return {
        ...state,
        priceHistory: [],
        priceHistoryFailed: false,
        priceHistoryLoading: true,
      };
    },
    [`${GET_PRICE_HISTORY}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        // Only grabbing the buy info for this
        priceHistory: payload.buy.map(item => {
          // Convert epoch seconds to ISO time format
          item.trade_timestamp = new Date(item.trade_timestamp * 1000).toISOString();
          return { ...item };
        }),
        priceHistoryLoading: false,
      };
    },
    [`${GET_PRICE_HISTORY}_${FAILURE}`](state) {
      return {
        ...state,
        priceHistoryFailed: true,
        priceHistoryLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
