import { ACCOUNT_INFO_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Account
export const GET_ACCOUNT_INFO = 'ACCOUNTS::GET_ACCOUNT_INFO';
export const GET_ACCOUNT_ASSETS = 'ACCOUNTS::GET_ACCOUNT_ASSETS';
export const GET_ACCOUNT_TXS = 'ACCOUNTS::GET_ACCOUNT_TXS';
export const GET_ACCOUNT_DELEGATIONS = 'ACCOUNTS::GET_ACCOUNT_DELEGATIONS';
export const GET_ACCOUNT_REDELEGATIONS = 'ACCOUNTS::GET_ACCOUNT_REDELEGATIONS';
export const GET_ACCOUNT_REWARDS = 'ACCOUNTS::GET_ACCOUNT_REWARDS';
export const GET_ACCOUNT_UNBONDING = 'ACCOUNTS::GET_ACCOUNT_UNBONDING';

// API Calls
//  * Account
export const getAccountInfo = address => async dispatch =>
  ajaxGet(GET_ACCOUNT_INFO, dispatch, `${ACCOUNT_INFO_URL}/${address}`);

export const getAccountAssets =
  ({ address, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_ACCOUNT_ASSETS,
      dispatch,
      `${ACCOUNT_INFO_URL}/${address}/balances?page=${page}&count=${count}`
    );

export const getAccountDelegations =
  ({ address, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_ACCOUNT_DELEGATIONS,
      dispatch,
      `${ACCOUNT_INFO_URL}/${address}/delegations?page=${page}&count=${count}`
    );

export const getAccountRedelegations = address => async dispatch =>
  ajaxGet(GET_ACCOUNT_REDELEGATIONS, dispatch, `${ACCOUNT_INFO_URL}/${address}/redelegations`);

export const getAccountRewards = address => async dispatch =>
  ajaxGet(GET_ACCOUNT_REWARDS, dispatch, `${ACCOUNT_INFO_URL}/${address}/rewards`);

export const getAccountUnbonding = address => async dispatch =>
  ajaxGet(GET_ACCOUNT_UNBONDING, dispatch, `${ACCOUNT_INFO_URL}/${address}/unbonding`);
