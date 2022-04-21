import { handleActions } from 'redux-actions';
import {
  GET_CONTRACT_CODE,
  GET_CONTRACTS_BY_CODE,
  GET_CODES,
  GET_CONTRACT_DETAILS,
  GET_CONTRACT_HISTORY,
  GET_CONTRACTS,
  GET_CONTRACT_TXS,
} from '../actions/contractActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Contract Code
  contractCode: '',
  contractCodeLoading: false,
  // Contracts by code
  contractsByCode: [],
  contractsByCodePages: 0,
  contractsByCodeLoading: false,
  contractsByCodeTotal: 0,
  // Codes
  codes: [],
  codesPages: 0,
  codesLoading: false,
  codesTotal: 0,
  // Contract Details
  contractDetails: '',
  contractDetailsLoading: false,
  // Contract History
  contractHistory: '',
  contractHistoryLoading: false,
  // Contracts
  contracts: [],
  contractsPages: 0,
  contractsLoading: false,
  contractsTotal: 0,
  // Contract Transactions
  contractTxs: [],
  contractTxsLoading: false,
  contractTxsPages: 0,
  contractTxsTotal: 0,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_CONTRACT_CODE
    -------------------*/
    [`${GET_CONTRACT_CODE}_${REQUEST}`](state) {
      return {
        ...state,
        contractCodeLoading: true,
        contractCodeFailed: false,
      };
    },
    [`${GET_CONTRACT_CODE}_${SUCCESS}`](state, { payload: contractCode }) {
      return {
        ...state,
        contractCode,
        contractCodeLoading: false,
      };
    },
    [`${GET_CONTRACT_CODE}_${FAILURE}`](state) {
      return {
        ...state,
        contractCodeLoading: false,
        contractCodeFailed: true,
      };
    },
    /* -----------------
    GET_CONTRACTS_BY_CODE
    -------------------*/
    [`${GET_CONTRACTS_BY_CODE}_${REQUEST}`](state) {
      return {
        ...state,
        contractsByCodeLoading: true,
      };
    },
    [`${GET_CONTRACTS_BY_CODE}_${SUCCESS}`](state, { payload }) {
      const {
        pages: contractsByCodePages,
        results: contractsByCode,
        total: contractsByCodeTotal,
      } = payload;

      return {
        ...state,
        contractsByCode,
        contractsByCodePages,
        contractsByCodeTotal,
        contractsByCodeLoading: false,
      };
    },
    [`${GET_CONTRACTS_BY_CODE}_${FAILURE}`](state) {
      return {
        ...state,
        contractsByCodeLoading: false,
      };
    },
    /* -----------------
    GET_CODES
    -------------------*/
    [`${GET_CODES}_${REQUEST}`](state) {
      return {
        ...state,
        codesLoading: true,
      };
    },
    [`${GET_CODES}_${SUCCESS}`](state, { payload }) {
      const { pages: codesPages, results: codes, total: codesTotal } = payload;

      return {
        ...state,
        codes,
        codesPages,
        codesTotal,
        codesLoading: false,
      };
    },
    [`${GET_CODES}_${FAILURE}`](state) {
      return {
        ...state,
        codesLoading: false,
      };
    },
    /* -----------------
    GET_CONTRACT_DETAILS
    -------------------*/
    [`${GET_CONTRACT_DETAILS}_${REQUEST}`](state) {
      return {
        ...state,
        contractDetailsLoading: true,
        contractDetailsFailed: false,
      };
    },
    [`${GET_CONTRACT_DETAILS}_${SUCCESS}`](state, { payload: contractDetails }) {
      return {
        ...state,
        contractDetails,
        contractDetailsLoading: false,
      };
    },
    [`${GET_CONTRACT_DETAILS}_${FAILURE}`](state) {
      return {
        ...state,
        contractDetailsLoading: false,
        contractDetailsFailed: true,
      };
    },
    /* -----------------
    GET_CONTRACT_HISTORY
    -------------------*/
    [`${GET_CONTRACT_HISTORY}_${REQUEST}`](state) {
      return {
        ...state,
        contractHistoryLoading: true,
        contractHistoryFailed: false,
      };
    },
    [`${GET_CONTRACT_HISTORY}_${SUCCESS}`](state, { payload: contractHistory }) {
      return {
        ...state,
        contractHistory,
        contractHistoryLoading: false,
      };
    },
    [`${GET_CONTRACT_HISTORY}_${FAILURE}`](state) {
      return {
        ...state,
        contractHistoryLoading: false,
        contractHistoryFailed: true,
      };
    },
    /* -----------------
    GET_CONTRACTS
    -------------------*/
    [`${GET_CONTRACTS}_${REQUEST}`](state) {
      return {
        ...state,
        contractsLoading: true,
      };
    },
    [`${GET_CONTRACTS}_${SUCCESS}`](state, { payload }) {
      const { pages: contractsPages, results: contracts, total: contractsTotal } = payload;

      return {
        ...state,
        contracts,
        contractsPages,
        contractsTotal,
        contractsLoading: false,
      };
    },
    [`${GET_CONTRACTS}_${FAILURE}`](state) {
      return {
        ...state,
        contractsLoading: false,
      };
    },
    /* -----------------
    GET_CONTRACT_TXS
    -------------------*/
    [`${GET_CONTRACT_TXS}_${REQUEST}`](state) {
      return {
        ...state,
        contractTxsLoading: true,
      };
    },
    [`${GET_CONTRACT_TXS}_${SUCCESS}`](state, { payload }) {
      const {
        results: contractTxs = [],
        pages: contractTxsPages,
        total: contractTxsTotal,
      } = payload;
      return {
        ...state,
        contractTxs,
        contractTxsPages,
        contractTxsTotal,
        contractTxsLoading: false,
      };
    },
    [`${GET_CONTRACT_TXS}_${FAILURE}`](state) {
      return {
        ...state,
        contractTxsLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
