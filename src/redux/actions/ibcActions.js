import {
  IBC_CHAIN_URL,
  IBC_CHANNEL_URL,
  IBC_BALANCES_DENOM_URL,
  IBC_CHANNEL_STATUS_URL,
  IBC_DENOMS_ALL_URL,
} from 'consts';
import { ajaxGet } from './xhrActions';

// Account
export const GET_CHAIN_BALANCES = 'IBC::GET_CHAIN_BALANCES';
export const GET_CHANNEL_BALANCES = 'IBC::GET_CHANNEL_BALANCES';
export const GET_DENOM_BALANCES = 'IBC::GET_DENOM_BALANCES';
export const GET_CHANNEL_STATUS = 'IBC::GET_CHANNEL_STATUS';
export const GET_DENOMS_ALL = 'IBC::GET_DENOMS_ALL';

// API Calls
export const getChainBalances = address => async dispatch =>
  ajaxGet(GET_CHAIN_BALANCES, dispatch, `${IBC_CHAIN_URL}/${address}`);

export const getChannelBalances = address => async dispatch =>
  ajaxGet(GET_CHANNEL_BALANCES, dispatch, `${IBC_CHANNEL_URL}`);

export const getDenomBalances = address => async dispatch =>
  ajaxGet(GET_DENOM_BALANCES, dispatch, `${IBC_BALANCES_DENOM_URL}/${address}`);

// Options: STATE_CLOSED, STATE_INIT, STATE_OPEN, STATE_TRYOPEN,
//          STATE_UNINITIALIZED_UNSPECIFIED, UNRECOGNIZED
export const getChannelStatus =
  (status = '') =>
  async dispatch =>
    ajaxGet(
      GET_CHANNEL_STATUS,
      dispatch,
      `${IBC_CHANNEL_STATUS_URL}/${status && `?status=${status}`}`
    );

export const getDenomsAll =
  ({ page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(GET_DENOMS_ALL, dispatch, `${IBC_DENOMS_ALL_URL}/all?page=${page}&count=${count}`);
