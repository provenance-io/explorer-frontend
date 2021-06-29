import { handleActions } from 'redux-actions';
import { capitalize } from 'utils';
import {
  GET_TXS_BY_BLOCK,
  GET_TXS_BY_ADDRESS,
  GET_TX_FULL_JSON,
  GET_TX_HISTORY,
  GET_TX_INFO,
  GET_TX_MSGS,
  GET_TX_MSG_TYPES,
  GET_TXS_RECENT,
  GET_TX_TYPES,
  RESET_TX_MSGS,
  SET_RECENT_TXS_COUNT,
} from '../actions/txsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Txs
  txInfo: {},
  txsInfoLoading: false,
  // Recent Txs
  txs: [],
  txsPages: 0,
  recentTxsCount: 10,
  txsRecentLoading: false,
  // Full explorer tx history
  txHistory: [],
  txHistoryDayRange: 14,
  txHistoryLoading: true,
  txFullJSONLoading: false,
  txFullJSON: '',
  // Txs for a specific block
  txsByBlock: [],
  txsByBlockLoading: false,
  txsByBlockPages: 0,
  // Txs for a specific wallet address
  txsByAddress: [],
  txsByAddressLoading: false,
  txsByAddressPages: 0,
  // Tx Types (for filters)
  txTypesLoading: false,
  txTypes: {},
  // Tx Msgs
  txMsgs: {},
  txMsgsLoading: false,
  txMsgsPages: 0,
  txMsgsTotal: 0,
  // Tx Msg Types
  txMsgTypes: [],
  txMsgLoading: false,
};

const reducer = handleActions(
  {
    [RESET_TX_MSGS](state, { payload: txHash }) {
      const { [txHash]: removedItem, ...txMsgs } = state.txMsgs;
      return {
        ...state,
        txMsgs,
      };
    },
    [SET_RECENT_TXS_COUNT](state, { payload: recentTxsCount }) {
      return {
        ...state,
        recentTxsCount,
      };
    },
    /* -----------------
    GET_TX_TYPES
    -------------------*/
    [`${GET_TX_TYPES}_${REQUEST}`](state) {
      return {
        ...state,
        txTypesLoading: true,
      };
    },
    [`${GET_TX_TYPES}_${SUCCESS}`](state, { payload }) {
      // Initial value of "all"
      const txTypes = {
        allTxTypes: { isDefault: true, title: 'All Tx Types' },
      };
      // Sample of multi-nested options
      // gov: {
      //   title: 'Gov',
      //   options: {
      //     submitPropsal: { title: 'Submit Proposal' },
      //     deposit: { title: 'Deposit' },
      //     vote: { title: 'Vote' },
      //   },
      // },
      // Loop through each module from API and add to types
      payload.forEach(({ module, type }) => {
        txTypes[module] = { title: capitalize(module), options: {} };
      });
      // Loop through each type from API and add to types
      payload.forEach(({ module, type }) => {
        txTypes[module].options[type] = { title: capitalize(type) };
      });

      return {
        ...state,
        txTypes,
        txTypesLoading: false,
      };
    },
    [`${GET_TX_TYPES}_${FAILURE}`](state) {
      return {
        ...state,
        txTypesLoading: false,
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
      const { pages: txsByBlockPages, results: txsByBlock } = payload;

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
      const { results: txsByAddress = [], pages: txsByAddressPages } = payload;
      return {
        ...state,
        txsByAddress,
        txsByAddressPages,
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
    /* -----------------
    GET_TX_MSGS
    -------------------*/
    [`${GET_TX_MSGS}_${REQUEST}`](state) {
      return {
        ...state,
        txMsgsLoading: true,
      };
    },
    [`${GET_TX_MSGS}_${SUCCESS}`](state, { payload, meta }) {
      const { pages: txMsgsPages, results: txMsgs, total: txMsgsTotal } = payload;
      const { txHash } = meta;
      const prevMsgs = state.txMsgs[txHash] || [];
      return {
        ...state,
        txMsgs: {
          ...state.txMsgs,
          [txHash]: [...prevMsgs, ...txMsgs],
        },
        txMsgsLoading: false,
        txMsgsPages,
        txMsgsTotal,
      };
    },
    [`${GET_TX_MSGS}_${FAILURE}`](state) {
      return {
        ...state,
        txMsgsLoading: false,
      };
    },
    /* -----------------
    GET_TX_MSGS_TYPES
    -------------------*/
    [`${GET_TX_MSG_TYPES}_${REQUEST}`](state) {
      return {
        ...state,
        txMsgTypesLoading: true,
      };
    },
    [`${GET_TX_MSG_TYPES}_${SUCCESS}`](state, { payload }) {
      // payload is an array of message objects holding the type
      const txMsgTypes = payload.map(typeObj => typeObj.type);
      return {
        ...state,
        txMsgTypesLoading: false,
        txMsgTypes,
      };
    },
    [`${GET_TX_MSG_TYPES}_${FAILURE}`](state) {
      return {
        ...state,
        txMsgTypesLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
