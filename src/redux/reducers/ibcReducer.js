import { handleActions } from 'redux-actions';
import {
  GET_CHAIN_BALANCES,
  GET_CHANNEL_BALANCES,
  GET_DENOM_BALANCES,
  GET_CHANNEL_STATUS,
  GET_DENOMS_ALL,
} from '../actions/ibcActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Chain balances
  chainBalances: [],
  chainBalancesFailed: false,
  chainBalancesLoading: false,
  // Channel balances
  channelBalances: [],
  channelBalancesFailed: false,
  channelBalancesLoading: false,
  // Denom balances
  denomBalances: [],
  denomBalancesFailed: false,
  denomBalancesLoading: false,
  // Channel Status
  channelStatus: [],
  channelStatusFailed: false,
  channelStatusLoading: false,
  // Denoms all
  denomsAll: [],
  denomsAllFailed: false,
  denomsAllLoading: false,
  denomsPages: 0,
  denomsTotal: 0,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_CHAIN_BALANCES
    -------------------*/
    [`${GET_CHAIN_BALANCES}_${REQUEST}`](state) {
      return {
        ...state,
        chainBalances: [],
        chainBalancesFailed: false,
        chainBalancesLoading: true,
      };
    },
    [`${GET_CHAIN_BALANCES}_${SUCCESS}`](state, { payload: chainBalances }) {
      return {
        ...state,
        chainBalances,
        chainBalancesLoading: false,
      };
    },
    [`${GET_CHAIN_BALANCES}_${FAILURE}`](state) {
      return {
        ...state,
        chainBalancesFailed: true,
        chainBalancesLoading: false,
      };
    },
    /* -----------------
    GET_CHANNEL_BALANCES
    -------------------*/
    [`${GET_CHANNEL_BALANCES}_${REQUEST}`](state) {
      return {
        ...state,
        channelBalances: [],
        channelBalancesFailed: false,
        channelBalancesLoading: true,
      };
    },
    [`${GET_CHANNEL_BALANCES}_${SUCCESS}`](state, { payload: channelBalances }) {
      return {
        ...state,
        channelBalances,
        channelBalancesLoading: false,
      };
    },
    [`${GET_CHANNEL_BALANCES}_${FAILURE}`](state) {
      return {
        ...state,
        channelBalancesFailed: true,
        channelBalancesLoading: false,
      };
    },
    /* -----------------
    GET_DENOM_BALANCES
    -------------------*/
    [`${GET_DENOM_BALANCES}_${REQUEST}`](state) {
      return {
        ...state,
        denomBalances: [],
        denomBalancesFailed: false,
        denomBalancesLoading: true,
      };
    },
    [`${GET_DENOM_BALANCES}_${SUCCESS}`](state, { payload: denomBalances }) {
      return {
        ...state,
        denomBalances,
        denomBalancesLoading: false,
      };
    },
    [`${GET_DENOM_BALANCES}_${FAILURE}`](state) {
      return {
        ...state,
        denomBalancesFailed: true,
        denomBalancesLoading: false,
      };
    },
    /* -----------------
    GET_CHANNEL_STATUS
    -------------------*/
    [`${GET_CHANNEL_STATUS}_${REQUEST}`](state) {
      return {
        ...state,
        channelStatus: [],
        channelStatusFailed: false,
        channelStatusLoading: true,
      };
    },
    [`${GET_CHANNEL_STATUS}_${SUCCESS}`](state, { payload: channelStatus }) {
      return {
        ...state,
        channelStatus,
        channelStatusLoading: false,
      };
    },
    [`${GET_CHANNEL_STATUS}_${FAILURE}`](state) {
      return {
        ...state,
        channelStatusFailed: true,
        channelStatusLoading: false,
      };
    },
    /* -----------------
    GET_DENOMS_ALL
    -------------------*/
    [`${GET_DENOMS_ALL}_${REQUEST}`](state) {
      return {
        ...state,
        denomsAll: [],
        denomsAllFailed: false,
        denomsAllLoading: true,
      };
    },
    [`${GET_DENOMS_ALL}_${SUCCESS}`](state, { payload }) {
      const { pages: denomsPages, results: denomsAll = [], total: denomsTotal } = payload;
      return {
        ...state,
        denomsAll,
        denomsPages,
        denomsTotal,
        denomsAllLoading: false,
      };
    },
    [`${GET_DENOMS_ALL}_${FAILURE}`](state) {
      return {
        ...state,
        denomsAllFailed: true,
        denomsAllLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
