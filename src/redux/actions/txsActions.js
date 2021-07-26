import qs from 'query-string';
import { createAction } from 'redux-actions';
import { isEmpty } from 'utils/lang';
import {
  TX_INFO_URL,
  TXS_RECENT_URL,
  TX_HISTORY_URL,
  TXS_BY_BLOCK_URL,
  TXS_BY_ADDRESS_URL,
  TX_TYPES_URL,
} from 'consts';
import { ajaxGet } from './xhrActions';

// Constants
// -- API
export const GET_TX_INFO = 'TX::GET_TX_INFO';
export const GET_TXS_RECENT = 'TX::GET_TXS_RECENT';
export const GET_TX_HISTORY = 'TX::GET_TX_HISTORY';
export const GET_TXS_BY_BLOCK = 'TX::GET_TXS_BY_BLOCK';
export const GET_TXS_BY_ADDRESS = 'TX::GET_TXS_BY_ADDRESS';
export const GET_TX_FULL_JSON = 'TX::GET_TX_FULL_JSON';
export const GET_TX_TYPES = 'TX::GET_TX_TYPES';
export const GET_TX_MSGS = 'TX::GET_TX_MSGS';
export const GET_TX_MSG_TYPES = 'TX::GET_TX_MSG_TYPES';
export const GET_TX_BY_MODULE = 'TX::GET_TX_BY_MODULE';
// -- Store
export const RESET_TX_MSGS = 'TX::RESET_TX_MSGS';
export const SET_RECENT_TXS_COUNT = 'TX::SET_RECENT_TXS_COUNT';

// Actions
// -- API
export const getTxsRecent =
  ({ count = 10, page = 1, type = '', status = '', toDate, fromDate }) =>
  async dispatch =>
    ajaxGet(
      GET_TXS_RECENT,
      dispatch,
      `${TXS_RECENT_URL}?count=${count}&page=${page}${type ? `&msgType=${type}` : ''}${
        status ? `&txStatus=${status.toUpperCase()}` : ''
      }${toDate ? `&toDate=${toDate}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}`
    );

export const getTxsByAddress =
  ({ count = 10, page = 1, type = '', status = '', address }) =>
  async dispatch =>
    ajaxGet(
      GET_TXS_BY_ADDRESS,
      dispatch,
      `${TXS_BY_ADDRESS_URL}/${address}?count=${count}&page=${page}${
        type ? `&msgType=${type}` : ''
      }${status ? `&txStatus=${status.toUpperCase()}` : ''}`
    );

export const getTxsByBlock =
  ({ blockheight, count = 10, page = 1 }) =>
  async dispatch =>
    ajaxGet(
      GET_TXS_BY_BLOCK,
      dispatch,
      `${TXS_BY_BLOCK_URL}/${blockheight}?count=${count}&page=${page}`
    );

export const getTxInfo = txHash => async dispatch =>
  ajaxGet(GET_TX_INFO, dispatch, `${TX_INFO_URL}/${txHash}`);

export const getTxHistory =
  ({ toDate, fromDate, granularity = 'day' }) =>
  async dispatch =>
    ajaxGet(
      GET_TX_HISTORY,
      dispatch,
      `${TX_HISTORY_URL}?toDate=${toDate}&fromDate=${fromDate}&granularity=${granularity.toUpperCase()}`
    );

export const getTxFullJSON = txHash => async dispatch =>
  ajaxGet(GET_TX_FULL_JSON, dispatch, `${TX_INFO_URL}/${txHash}/json`);

export const getTxTypes = () => async dispatch => ajaxGet(GET_TX_TYPES, dispatch, TX_TYPES_URL);

export const getTxMsgs =
  ({ txHash, count = 10, page = 1, msgType = '' }) =>
  async dispatch =>
    ajaxGet(
      GET_TX_MSGS,
      dispatch,
      `${TX_INFO_URL}/${txHash}/msgs?${qs.stringify({ page, count, msgType })}`,
      null,
      { txHash }
    );

export const getTxMsgTypes = txHash => async dispatch =>
  ajaxGet(GET_TX_MSG_TYPES, dispatch, `${TX_INFO_URL}/types/tx/${txHash}`);

export const getTxByModule =
  ({ module, ...rest }) =>
  async dispatch => {
    const queries = !isEmpty(rest) ? `?${qs.stringify(rest)}` : '';
    ajaxGet(GET_TX_BY_MODULE, dispatch, `${TX_INFO_URL}/module/${module}${queries}`);
  };

// -- Store
export const resetTxMsgs = createAction(RESET_TX_MSGS);
export const setRecentTxsCount = createAction(SET_RECENT_TXS_COUNT);
