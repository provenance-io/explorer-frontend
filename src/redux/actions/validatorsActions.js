import {
  VALIDATOR_INFO_URL,
  VALIDATORS_RECENT_URL,
  BLOCK_VALIDATORS_URL,
  VALIDATOR_COMMISSION_URL,
  VALIDATOR_DELEGATIONS_URL,
  VALIDATOR_UNBONDING_DELEGATIONS_URL,
  VALIDATOR_DELEGATION_TXS_URL,
  VALIDATOR_TXS_URL,
} from 'consts';
import { ajaxGet } from './xhrActions';

// API Calls
export const GET_TOP_VALIDATORS = 'GET_TOP_VALIDATORS';
export const GET_BLOCK_VALIDATORS = 'GET_BLOCK_VALIDATORS';
export const GET_VALIDATOR_INFO = 'GET_VALIDATOR_INFO';
export const GET_VALIDATORS_RECENT = 'GET_VALIDATORS_RECENT';
export const GET_VALIDATOR_COMMISSION = 'GET_VALIDATOR_COMMISSION';
export const GET_VALIDATOR_DELEGATIONS = 'GET_VALIDATOR_DELEGATIONS';
export const GET_VALIDATOR_UNBONDING_DELEGATIONS = 'GET_VALIDATOR_UNBONDING_DELEGATIONS';
export const GET_VALIDATOR_DELEGATION_TXS = 'GET_VALIDATOR_DELEGATION_TXS';
export const GET_VALIDATOR_TXS = 'GET_VALIDATOR_TXS';

// API Calls
export const getBlockValidators = ({ blockHeight, page = 1, count = 10, sort = 'desc' }) => async (dispatch) =>
  ajaxGet(GET_BLOCK_VALIDATORS, dispatch, `${BLOCK_VALIDATORS_URL}/${blockHeight}?page=${page}&count=${count}&sort=${sort}`);
export const getValidatorSpotlight = (id) => async (dispatch) => ajaxGet(GET_VALIDATOR_INFO, dispatch, `${VALIDATOR_INFO_URL}/${id}`);
// export const getValidatorsRecent = ({ sort = 'desc', page = 1, count = 10, status = 'active' }) => async (dispatch) =>
//   ajaxGet(GET_VALIDATORS_RECENT, dispatch, `${VALIDATORS_RECENT_URL}?sort=${sort}&page=${page}&count=${count}&status=${status}`);
export const getValidatorsRecent = ({ sort = 'desc', page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_VALIDATORS_RECENT, dispatch, `${VALIDATORS_RECENT_URL}?sort=${sort}&page=${page}&count=${count}`);
export const getTopValidators = ({ sort = 'desc', page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_TOP_VALIDATORS, dispatch, `${VALIDATORS_RECENT_URL}?sort=${sort}&page=${page}&count=${count}`);
export const getValidatorCommission = (validatorId) => async (dispatch) =>
  ajaxGet(GET_VALIDATOR_COMMISSION, dispatch, `${VALIDATOR_COMMISSION_URL}?id=${validatorId}`);
export const getValidatorDelegations = ({ id, sort = 'desc', page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_VALIDATOR_DELEGATIONS, dispatch, `${VALIDATOR_DELEGATIONS_URL}?id=${id}&sort=${sort}&page=${page}&count=${count}`);
export const getValidatorUnbondingDelegations = ({ id, sort = 'desc', page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(
    GET_VALIDATOR_UNBONDING_DELEGATIONS,
    dispatch,
    `${VALIDATOR_UNBONDING_DELEGATIONS_URL}?id=${id}&sort=${sort}&page=${page}&count=${count}`
  );
export const getValidatorDelegationTxs = ({ id, sort = 'desc', page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_VALIDATOR_DELEGATION_TXS, dispatch, `${VALIDATOR_DELEGATION_TXS_URL}?id=${id}&sort=${sort}&page=${page}&count=${count}`);
export const getValidatorTxs = ({ id, sort = 'desc', page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_VALIDATOR_TXS, dispatch, `${VALIDATOR_TXS_URL}?id=${id}&sort=${sort}&page=${page}&count=${count}`);
