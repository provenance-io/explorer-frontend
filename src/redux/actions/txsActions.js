import { createAction } from 'redux-actions';
import { TX_INFO_URL, TXS_RECENT_URL, TX_HISTORY_URL, TXS_BY_BLOCK_URL, TXS_BY_ADDRESS_URL, TX_TYPES_URL } from 'consts';
import { getUTCTime } from 'utils';
import { ajaxGet } from './xhrActions';

// Constants
// -- API
export const GET_TX_INFO = 'GET_TX_INFO';
export const GET_TXS_RECENT = 'GET_TXS_RECENT';
export const GET_TX_HISTORY = 'GET_TX_HISTORY';
export const GET_TXS_BY_BLOCK = 'GET_TXS_BY_BLOCK';
export const GET_TXS_BY_ADDRESS = 'GET_TXS_BY_ADDRESS';
export const GET_TX_FULL_JSON = 'GET_TX_FULL_JSON';
export const GET_TX_TYPES = 'GET_TX_TYPES';
// -- Store
export const SET_RECENT_TXS_COUNT = 'SET_RECENT_TXS_COUNT';

// Actions
// -- API
export const getTxsRecent = ({ count = 10, page = 1, type = '', status = '', toDate, fromDate }) => async (dispatch) => {
  // Convert dates into UTC time.  When a user selects a date it is always in their local time.  Convert, then send to the api
  const toDateUTC = toDate && getUTCTime(toDate, 'yyyy-MM-dd');
  const fromDateUTC = fromDate && getUTCTime(fromDate, 'yyyy-MM-dd');
  debugger; // eslint-disable-line no-debugger
  return ajaxGet(
    GET_TXS_RECENT,
    dispatch,
    `${TXS_RECENT_URL}?count=${count}&page=${page}${type ? `&msgType=${type}` : ''}${
      status ? `&txStatus=${status.toUpperCase()}` : ''
    }${toDateUTC ? `&toDate=${toDateUTC}` : ''}${fromDateUTC ? `&fromDate=${fromDateUTC}` : ''}`
  );
};
export const getTxsByAddress = ({ count = 10, page = 1, type = '', status = '', address }) => async (dispatch) =>
  ajaxGet(
    GET_TXS_BY_ADDRESS,
    dispatch,
    `${TXS_BY_ADDRESS_URL}/${address}?count=${count}&page=${page}${type ? `&msgType=${type}` : ''}${
      status ? `&txStatus=${status.toUpperCase()}` : ''
    }`
  );
export const getTxsByBlock = ({ blockheight, count = 10, page = 1 }) => async (dispatch) =>
  ajaxGet(GET_TXS_BY_BLOCK, dispatch, `${TXS_BY_BLOCK_URL}/${blockheight}?count=${count}&page=${page}`);
export const getTxInfo = (txHash) => async (dispatch) => ajaxGet(GET_TX_INFO, dispatch, `${TX_INFO_URL}/${txHash}`);
export const getTxHistory = ({ toDate, fromDate, granularity = 'day' }) => async (dispatch) =>
  ajaxGet(
    GET_TX_HISTORY,
    dispatch,
    `${TX_HISTORY_URL}?toDate=${toDate}&fromDate=${fromDate}&granularity=${granularity.toUpperCase()}`
  );
export const getTxFullJSON = (txHash) => async (dispatch) => ajaxGet(GET_TX_FULL_JSON, dispatch, `${TX_INFO_URL}/${txHash}/json`);
export const getTxTypes = () => async (dispatch) => ajaxGet(GET_TX_TYPES, dispatch, TX_TYPES_URL);
// -- Store
export const setRecentTxsCount = createAction(SET_RECENT_TXS_COUNT);
