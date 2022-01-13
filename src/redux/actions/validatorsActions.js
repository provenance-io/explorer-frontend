import {
  VALIDATOR_INFO_URL,
  VALIDATORS_RECENT_URL,
  VALIDATORS_GET_ALL_URL,
  BLOCK_VALIDATORS_URL,
  TX_INFO_URL,
} from 'consts';
import { ajaxGet } from './xhrActions';

// API Calls
export const GET_TOP_VALIDATORS = 'GET_TOP_VALIDATORS';
export const GET_ALL_VALIDATORS = 'GET_ALL_VALIDATORS';
export const GET_BLOCK_VALIDATORS = 'GET_BLOCK_VALIDATORS';
export const GET_VALIDATOR_INFO = 'GET_VALIDATOR_INFO';
export const GET_VALIDATORS_RECENT = 'GET_VALIDATORS_RECENT';
export const GET_VALIDATOR_COMMISSION = 'GET_VALIDATOR_COMMISSION';
export const GET_VALIDATOR_DELEGATIONS = 'GET_VALIDATOR_DELEGATIONS';
export const GET_VALIDATOR_UNBONDING_DELEGATIONS = 'GET_VALIDATOR_UNBONDING_DELEGATIONS';
export const GET_VALIDATOR_DELEGATION_TXS = 'GET_VALIDATOR_DELEGATION_TXS';
export const GET_VALIDATOR_TXS = 'GET_VALIDATOR_TXS';

// API Calls
export const getBlockValidators =
  ({ blockHeight, page = 1, count = 10, sort = 'desc' }) =>
  async dispatch =>
    ajaxGet(
      GET_BLOCK_VALIDATORS,
      dispatch,
      `${BLOCK_VALIDATORS_URL}/${blockHeight}?page=${page}&count=${count}&sort=${sort}`
    );
export const getValidatorsRecent =
  ({ page = 1, count = 10, status = 'active' }) =>
  async dispatch =>
    ajaxGet(
      GET_VALIDATORS_RECENT,
      dispatch,
      `${VALIDATORS_RECENT_URL}?page=${page}&count=${count}&status=${status}`
    );
export const getAllValidators =
  ({ page = 1, count = 100, status = 'all' } = {}) =>
  async dispatch =>
    ajaxGet(
      GET_ALL_VALIDATORS,
      dispatch,
      `${VALIDATORS_GET_ALL_URL}?page=${page}&count=${count}&status=${status}`
    );
export const getTopValidators =
  ({ sort = 'desc', page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_TOP_VALIDATORS,
      dispatch,
      `${VALIDATORS_RECENT_URL}?sort=${sort}&page=${page}&count=${count}`
    );
export const getValidatorSpotlight = id => async dispatch =>
  ajaxGet(GET_VALIDATOR_INFO, dispatch, `${VALIDATOR_INFO_URL}/${id}`);
export const getValidatorCommission = id => async dispatch =>
  ajaxGet(GET_VALIDATOR_COMMISSION, dispatch, `${VALIDATOR_INFO_URL}/${id}/commission`);
export const getValidatorDelegations =
  ({ id, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_VALIDATOR_DELEGATIONS,
      dispatch,
      `${VALIDATOR_INFO_URL}/${id}/delegations/bonded?count=${count}&page=${page}`
    );
export const getValidatorUnbondingDelegations =
  ({ id, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_VALIDATOR_UNBONDING_DELEGATIONS,
      dispatch,
      `${VALIDATOR_INFO_URL}/${id}/delegations/unbonding?count=${count}&page=${page}`
    );
export const getValidatorDelegationTxs =
  ({ id, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_VALIDATOR_DELEGATION_TXS,
      dispatch,
      `${TX_INFO_URL}/module/DELEGATION?address=${id}&page=${page}&count=${count}`
    );
export const getValidatorTxs =
  ({ id, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_VALIDATOR_TXS,
      dispatch,
      `${TX_INFO_URL}/module/VALIDATION?address=${id}&page=${page}&count=${count}`
    );
