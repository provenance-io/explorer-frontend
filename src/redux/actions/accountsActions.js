import { ACCOUNT_INFO_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Account
export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
export const GET_ACCOUNT_TXS = 'GET_ACCOUNT_TXS';

// API Calls
//  * Account
export const getAccountInfo = (address) => async (dispatch) => ajaxGet(GET_ACCOUNT_INFO, dispatch, `${ACCOUNT_INFO_URL}/${address}`);
export const getAccountTxs = (address) => async (dispatch) => ajaxGet(GET_ACCOUNT_TXS, dispatch, `${ACCOUNT_INFO_URL}/${address}/txs`);
