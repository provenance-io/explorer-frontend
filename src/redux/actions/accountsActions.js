import { ACCOUNT_INFO_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Account
export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
export const GET_ACCOUNT_TXS = 'GET_ACCOUNT_TXS';
export const GET_ACCOUNT_DELEGATIONS = 'GET_ACCOUNT_DELEGATIONS';
export const GET_ACCOUNT_REDELEGATIONS = 'GET_ACCOUNT_REDELEGATIONS';
export const GET_ACCOUNT_REWARDS = 'GET_ACCOUNT_REWARDS';
export const GET_ACCOUNT_UNBONDING = 'GET_ACCOUNT_UNBONDING';

// API Calls
//  * Account
export const getAccountInfo = (address) => async (dispatch) => ajaxGet(GET_ACCOUNT_INFO, dispatch, `${ACCOUNT_INFO_URL}/${address}`);
export const getAccountDelegations = (address, page = 1, count = 10) => async (dispatch) =>
  ajaxGet(GET_ACCOUNT_DELEGATIONS, dispatch, `${ACCOUNT_INFO_URL}/${address}/delegations?page=${page}&count=${count}`);
export const getAccountRedelegations = (address) => async (dispatch) =>
  ajaxGet(GET_ACCOUNT_REDELEGATIONS, dispatch, `${ACCOUNT_INFO_URL}/${address}/redelegations`);
export const getAccountRewards = (address) => async (dispatch) =>
  ajaxGet(GET_ACCOUNT_REWARDS, dispatch, `${ACCOUNT_INFO_URL}/${address}/rewards`);
export const getAccountUnbonding = (address) => async (dispatch) =>
  ajaxGet(GET_ACCOUNT_UNBONDING, dispatch, `${ACCOUNT_INFO_URL}/${address}/unbonding`);
