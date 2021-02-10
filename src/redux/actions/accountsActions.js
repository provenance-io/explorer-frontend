import { ACCOUNT_INFO_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Account
export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';

// API Calls
//  * Account
export const getAccountInfo = (address) => async (dispatch) => ajaxGet(GET_ACCOUNT_INFO, dispatch, `${ACCOUNT_INFO_URL}/${address}`);