import { handleActions } from 'redux-actions';
import {
  GET_TOP_VALIDATORS,
  GET_VALIDATOR_INFO,
  GET_BLOCK_VALIDATORS,
  GET_VALIDATORS_RECENT,
  GET_VALIDATOR_COMMISSION,
  GET_VALIDATOR_DELEGATIONS,
  GET_VALIDATOR_UNBONDING_DELEGATIONS,
  GET_VALIDATOR_DELEGATION_TXS,
  GET_VALIDATOR_TXS,
} from '../actions/validatorsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Validators Recent
  validators: [],
  validatorsPages: 0,
  validatorsRecentLoading: false,
  // Validator Spotlight
  validatorSpotlight: {},
  validatorSpotlightLoading: false,
  // Top Validators
  topValidators: [],
  topValidatorsLoading: false,
  // Block Validators
  blockValidators: [],
  blockValidatorsLoading: false,
  blockValidatorsPages: 0,
  // Validator Delegations
  validatorDelegations: [],
  validatorDelegationsLoading: false,
  validatorDelegationsPages: 1,
  // Validator Unbonding Delegations
  validatorUnbondingDelegations: [],
  validatorUnbondingDelegationsLoading: false,
  validatorUnbondingDelegationsPages: 1,
  // Validator Delegation Txs
  validatorDelegationTxs: [],
  validatorDelegationTxsLoading: false,
  validatorDelegationTxsPages: 1,
  // Validator Txs
  validatorTxs: [],
  validatorTxsLoading: false,
  validatorTxsPages: 1,
  // Validator Commission Info
  validatorCommission: {},
  validatorCommissionLoading: false,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_VALIDATOR_TXS
    -------------------*/
    [`${GET_VALIDATOR_TXS}_${REQUEST}`](state) {
      return {
        ...state,
        validatorTxsLoading: true,
      };
    },
    [`${GET_VALIDATOR_TXS}_${SUCCESS}`](state, { payload }) {
      const { pages: validatorTxsPages, results: validatorTxs } = payload;

      return {
        ...state,
        validatorTxs,
        validatorTxsPages,
        validatorTxsLoading: false,
      };
    },
    [`${GET_VALIDATOR_TXS}_${FAILURE}`](state) {
      return {
        ...state,
        validatorTxsLoading: false,
      };
    },
    /* -----------------
    GET_VALIDATOR_DELEGATION_TXS
    -------------------*/
    [`${GET_VALIDATOR_DELEGATION_TXS}_${REQUEST}`](state) {
      return {
        ...state,
        validatorDelegationTxsLoading: true,
      };
    },
    [`${GET_VALIDATOR_DELEGATION_TXS}_${SUCCESS}`](state, { payload }) {
      const { pages: validatorDelegationTxsPages, results: validatorDelegationTxs } = payload;
      return {
        ...state,
        validatorDelegationTxs,
        validatorDelegationTxsPages,
        validatorDelegationTxsLoading: false,
      };
    },
    [`${GET_VALIDATOR_DELEGATION_TXS}_${FAILURE}`](state) {
      return {
        ...state,
        validatorDelegationTxsLoading: false,
      };
    },
    /* -----------------
    GET_VALIDATOR_UNBONDING_DELEGATIONS
    -------------------*/
    [`${GET_VALIDATOR_UNBONDING_DELEGATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        validatorUnbondingDelegationsLoading: true,
      };
    },
    [`${GET_VALIDATOR_UNBONDING_DELEGATIONS}_${SUCCESS}`](state, { payload: validatorUnbondingDelegations }) {
      // TODO: Change this when pagination is supported
      // const { pages: validatorUnbondingDelegationsPages, results: validatorUnbondingDelegations } = payload;
      return {
        ...state,
        validatorUnbondingDelegations,
        // validatorUnbondingDelegationsPages,
        validatorUnbondingDelegationsLoading: false,
      };
    },
    [`${GET_VALIDATOR_UNBONDING_DELEGATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        validatorUnbondingDelegationsLoading: false,
      };
    },
    /* -----------------
    GET_VALIDATOR_DELEGATIONS
    -------------------*/
    [`${GET_VALIDATOR_DELEGATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        validatorDelegationsLoading: true,
      };
    },
    [`${GET_VALIDATOR_DELEGATIONS}_${SUCCESS}`](state, { payload }) {
      const { pages: validatorDelegationsPages, results: validatorDelegations } = payload;
      return {
        ...state,
        validatorDelegations,
        validatorDelegationsPages,
        validatorDelegationsLoading: false,
      };
    },
    [`${GET_VALIDATOR_DELEGATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        validatorDelegationsLoading: false,
      };
    },
    /* -----------------
    GET_VALIDATOR_COMMISSION
    -------------------*/
    [`${GET_VALIDATOR_COMMISSION}_${REQUEST}`](state) {
      return {
        ...state,
        validatorCommissionLoading: true,
      };
    },
    [`${GET_VALIDATOR_COMMISSION}_${SUCCESS}`](state, { payload: validatorCommission }) {
      return {
        ...state,
        validatorCommission,
        validatorCommissionLoading: false,
      };
    },
    [`${GET_VALIDATOR_COMMISSION}_${FAILURE}`](state) {
      return {
        ...state,
        validatorCommissionLoading: false,
      };
    },
    /* -----------------
    GET_TOP_VALIDATORS
    -------------------*/
    [`${GET_TOP_VALIDATORS}_${REQUEST}`](state) {
      return {
        ...state,
        topValidators: [],
        topValidatorsLoading: true,
      };
    },
    [`${GET_TOP_VALIDATORS}_${SUCCESS}`](state, { payload }) {
      const topValidators = payload.results || [];

      return {
        ...state,
        topValidators,
        topValidatorsLoading: false,
      };
    },
    [`${GET_TOP_VALIDATORS}_${FAILURE}`](state) {
      return {
        ...state,
        topValidatorsLoading: false,
      };
    },
    /* -----------------
    GET_VALIDATOR_INFO
    -------------------*/
    [`${GET_VALIDATOR_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        validatorSpotlightLoading: true,
      };
    },
    [`${GET_VALIDATOR_INFO}_${SUCCESS}`](state, { payload: validatorSpotlight }) {
      return {
        ...state,
        validatorSpotlight,
        validatorSpotlightLoading: false,
      };
    },
    [`${GET_VALIDATOR_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        validatorSpotlightLoading: false,
      };
    },
    /* -----------------
    GET_VALIDATORS_RECENT
    -------------------*/
    [`${GET_VALIDATORS_RECENT}_${REQUEST}`](state) {
      return {
        ...state,
        validatorsRecentLoading: true,
      };
    },
    [`${GET_VALIDATORS_RECENT}_${SUCCESS}`](state, { payload }) {
      const { pages: validatorsPages, results: validators } = payload;
      return {
        ...state,
        validators,
        validatorsPages,
        validatorsRecentLoading: false,
      };
    },
    [`${GET_VALIDATORS_RECENT}_${FAILURE}`](state) {
      return {
        ...state,
        validatorsRecentLoading: false,
      };
    },
    /* -----------------
    GET_BLOCK_VALIDATORS
    -------------------*/
    [`${GET_BLOCK_VALIDATORS}_${REQUEST}`](state) {
      return {
        ...state,
        blockValidatorsLoading: true,
      };
    },
    [`${GET_BLOCK_VALIDATORS}_${SUCCESS}`](state, { payload }) {
      const { results: blockValidators, pages: blockValidatorsPages } = payload;
      return {
        ...state,
        blockValidators,
        blockValidatorsPages,
        blockValidatorsLoading: false,
      };
    },
    [`${GET_BLOCK_VALIDATORS}_${FAILURE}`](state) {
      return {
        ...state,
        blockValidatorsLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
