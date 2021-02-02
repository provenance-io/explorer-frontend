import { handleActions } from 'redux-actions';
import {
  GET_TXS_RECENT,
  GET_TX_HISTORY,
  GET_TX_INFO,
  GET_TXS_BY_BLOCK,
  GET_TXS_BY_ADDRESS,
  GET_TX_FULL_JSON,
  SET_RECENT_TXS_COUNT,
} from '../actions/txsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Txs
  txInfo: {},
  txs: [],
  txsPages: 0,
  recentTxsCount: 10,
  // Full explorer tx history
  txHistory: [],
  txHistoryDayRange: 14,
  txHistoryLoading: true,
  txFullJSONLoading: false,
  txFullJSON: '',
  // Txs for a specific block
  txsByBlock: [],
  // Txs for a specific wallet address
  txsByAddress: [],
  // Loading states
  txsByBlockLoading: false,
  txsByAddressLoading: false,
  txsRecentLoading: false,
  txsInfoLoading: false,
};

const reducer = handleActions(
  {
    [SET_RECENT_TXS_COUNT](state, { payload: recentTxsCount }) {
      return {
        ...state,
        recentTxsCount,
      };
    },
    /* -----------------
    GET_TX_FULL_JSON
    -------------------*/
    [`${GET_TX_FULL_JSON}_${REQUEST}`](state) {
      return {
        ...state,
        txFullJSONLoading: true,
        txFullJSON: '',
      };
    },
    [`${GET_TX_FULL_JSON}_${SUCCESS}`](state, { payload: txFullJSON }) {
      return {
        ...state,
        txFullJSONLoading: false,
        txFullJSON,
      };
    },
    [`${GET_TX_FULL_JSON}_${FAILURE}`](state) {
      return {
        ...state,
        txFullJSONLoading: false,
      };
    },
    /* -----------------
    GET_TXS_BY_BLOCK
    -------------------*/
    [`${GET_TXS_BY_BLOCK}_${REQUEST}`](state) {
      return {
        ...state,
        txsByBlockLoading: true,
      };
    },
    [`${GET_TXS_BY_BLOCK}_${SUCCESS}`](state, { payload }) {
      const { items: txsByBlock = [], count: txsByBlockPages = 1 } = payload;

      return {
        ...state,
        txsByBlock,
        txsByBlockPages,
        txsByBlockLoading: false,
      };
    },
    [`${GET_TXS_BY_BLOCK}_${FAILURE}`](state) {
      return {
        ...state,
        txsByBlockLoading: false,
      };
    },
    /* -----------------
    GET_TXS_BY_ADDRESS
    -------------------*/
    [`${GET_TXS_BY_ADDRESS}_${REQUEST}`](state, { payload }) {
      return {
        ...state,
        txsByAddressLoading: true,
      };
    },
    [`${GET_TXS_BY_ADDRESS}_${SUCCESS}`](state, { payload }) {
      const { items: txsByAddress = [], count: txsByAddressPages = 1 } = payload;
      return {
        ...state,
        txsByAddress,
        txsByBlockPages: txsByAddressPages === 0 ? 1 : txsByAddressPages,
        txsByAddressLoading: false,
      };
    },
    [`${GET_TXS_BY_ADDRESS}_${FAILURE}`](state, { payload }) {
      return {
        ...state,
        txsByAddressLoading: false,
      };
    },
    /* -----------------
    GET_TXS_RECENT
    -------------------*/
    [`${GET_TXS_RECENT}_${REQUEST}`](state) {
      return {
        ...state,
        txsRecentLoading: true,
      };
    },
    [`${GET_TXS_RECENT}_${SUCCESS}`](state, { payload }) {
      const { pages: txsPages, results: txs } = payload;
      return {
        ...state,
        txs,
        // Need this api to be updated to return the total count of txs for pagination.
        // For now, use the txsRecent length as the count (inaccurate, this is just the count for a single page...)
        txsPages,
        txsRecentLoading: false,
      };
    },
    [`${GET_TXS_RECENT}_${FAILURE}`](state) {
      return {
        ...state,
        txsRecentLoading: false,
      };
    },
    /* -----------------
    GET_TX_INFO
    -------------------*/
    [`${GET_TX_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        txsInfoLoading: true,
      };
    },
    [`${GET_TX_INFO}_${SUCCESS}`](state, { payload: txInfo }) {
      return {
        ...state,
        txInfo,
        txsInfoLoading: false,
      };
    },
    [`${GET_TX_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        txsInfoLoading: false,
      };
    },
    /* -----------------
    GET_TX_HISTORY
    -------------------*/
    [`${GET_TX_HISTORY}_${REQUEST}`](state) {
      return {
        ...state,
        txHistoryLoading: true,
      };
    },
    [`${GET_TX_HISTORY}_${SUCCESS}`](state, { payload: txHistoryDesc }) {
      const txHistory = txHistoryDesc.reverse();
      return {
        ...state,
        txHistory,
        txHistoryLoading: false,
      };
    },
    [`${GET_TX_HISTORY}_${FAILURE}`](state) {
      return {
        ...state,
        txHistoryLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
