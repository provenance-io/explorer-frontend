import { handleActions } from 'redux-actions';
import { GET_ASSET_INFO, GET_ASSET_TRANSACTIONS, GET_ASSET_HOLDERS } from '../actions/assetsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Asset Information
  assetInfo: {},
  assetInfoLoading: false,
  // Asset Transactions
  assetTransactions: [],
  assetTransactionsLoading: false,
  assetTransactionsPages: 1,
  // Asset Holders
  assetHolders: [],
  assetHoldersLoading: false,
  assetHoldersPages: 1,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_ASSET_HOLDERS
    -------------------*/
    [`${GET_ASSET_HOLDERS}_${REQUEST}`](state) {
      return {
        ...state,
        assetHoldersLoading: true,
      };
    },
    [`${GET_ASSET_HOLDERS}_${SUCCESS}`](state, { payload }) {
      const { pages: assetHoldersPages, results: assetHolders } = payload;
      return {
        ...state,
        assetHolders,
        assetHoldersPages,
        assetHoldersLoading: false,
      };
    },
    [`${GET_ASSET_HOLDERS}_${FAILURE}`](state) {
      return {
        ...state,
        assetHoldersLoading: false,
      };
    },
    /* -----------------
    GET_ASSETS_TRANSACTIONS
    -------------------*/
    [`${GET_ASSET_TRANSACTIONS}_${REQUEST}`](state) {
      return {
        ...state,
        assetTransactionsLoading: true,
      };
    },
    [`${GET_ASSET_TRANSACTIONS}_${SUCCESS}`](state, { payload }) {
      const { pages: assetTransactionsPages, results: assetTransactions } = payload;
      return {
        ...state,
        assetTransactions,
        assetTransactionsPages,
        assetTransactionsLoading: false,
      };
    },
    [`${GET_ASSET_TRANSACTIONS}_${FAILURE}`](state) {
      return {
        ...state,
        assetTransactionsLoading: false,
      };
    },
    /* -----------------
    GET_ASSETS_INFO
    -------------------*/
    [`${GET_ASSET_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        assetInfoLoading: true,
      };
    },
    [`${GET_ASSET_INFO}_${SUCCESS}`](state, { payload: assetInfo }) {
      return {
        ...state,
        assetInfo,
        assetInfoLoading: false,
      };
    },
    [`${GET_ASSET_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        assetInfoLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
