import { createAction } from 'redux-actions';
import { TX_INFO_URL, TXS_RECENT_URL, TX_HISTORY_URL, TXS_BY_BLOCK_URL, TXS_BY_ADDRESS_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Constants
// -- API
export const GET_TX_INFO = 'GET_TX_INFO';
export const GET_TXS_RECENT = 'GET_TXS_RECENT';
export const GET_TX_HISTORY = 'GET_TX_HISTORY';
export const GET_TXS_BY_BLOCK = 'GET_TXS_BY_BLOCK';
export const GET_TXS_BY_ADDRESS = 'GET_TXS_BY_ADDRESS';
export const GET_TX_FULL_JSON = 'GET_TX_FULL_JSON';
// -- Store
export const SET_RECENT_TXS_COUNT = 'SET_RECENT_TXS_COUNT';

// Actions
// -- API
export const getTxsRecent = ({ count = 10, page = 1, type = '', status = '', toDate, fromDate }) => async (dispatch) =>
  ajaxGet(
    GET_TXS_RECENT,
    dispatch,
    `${TXS_RECENT_URL}?count=${count}&page=${page}${type ? `&msgType=${type}` : ''}${status ? `&status=${status}` : ''}${
      toDate ? `&toDate=${toDate}` : ''
    }${fromDate ? `&fromDate=${fromDate}` : ''}`
  );
export const getTxInfo = (txHash) => async (dispatch) => ajaxGet(GET_TX_INFO, dispatch, `${TX_INFO_URL}/${txHash}`);
export const getTxHistory = ({ toDate, fromDate, granularity = 'day' }) => async (dispatch) =>
  ajaxGet(GET_TX_HISTORY, dispatch, `${TX_HISTORY_URL}?toDate=${toDate}&fromDate=${fromDate}&granularity=${granularity}`);
export const getTxsByBlock = (blockheight) => async (dispatch) =>
  ajaxGet(GET_TXS_BY_BLOCK, dispatch, `${TXS_BY_BLOCK_URL}/${blockheight}`);
export const getTxsByAddress = (address) => async (dispatch) =>
  ajaxGet(GET_TXS_BY_BLOCK, dispatch, `${TXS_BY_ADDRESS_URL}?address=${address}`);
export const getTxFullJSON = (txHash) => async (dispatch) => ajaxGet(GET_TX_FULL_JSON, dispatch, `${TX_INFO_URL}/${txHash}/json`);
// -- Store
export const setRecentTxsCount = createAction(SET_RECENT_TXS_COUNT);
