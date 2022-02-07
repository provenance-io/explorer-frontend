import { ORDER_BOOK_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Vars
// - API
export const GET_DAILY_PRICE = 'ORDERBOOK::GET_DAILY_PRICE';
export const GET_PRICE_HISTORY = 'ORDERBOOK::GET_PRICE_HISTORY';

// Actions
// - API Calls
export const getDailyPrice = () => async dispatch =>
  ajaxGet(GET_DAILY_PRICE, dispatch, `${ORDER_BOOK_URL}/tickers`);

// parameter format is dd-mm-yyyy
export const getPriceHistory =
  (start_time = '', end_time = '') =>
  async dispatch =>
    ajaxGet(
      GET_PRICE_HISTORY,
      dispatch,
      `${ORDER_BOOK_URL}/historical_trades?ticker_id=HASH_USD&type=buy${
        start_time && `&start_time=${start_time}`
      }${end_time && `&end_time=${end_time}`}`
    );
