import { handleActions } from 'redux-actions';
import {
  GET_ASSET_INFO,
  GET_ASSET_ADMIN_TRANSACTIONS,
  GET_ASSET_TRANSFER_TRANSACTIONS,
  GET_ASSET_HOLDERS,
  GET_ASSETS_LIST,
} from '../actions/assetsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Asset Information
  assetInfo: {},
  assetInfoLoading: false,
  // Asset Transactions (Admin)
  assetAdminTransactions: [],
  assetAdminTransactionsLoading: false,
  assetAdminTransactionsPages: 1,
  // Asset Transactions (Transfer)
  assetTransferTransactions: [],
  assetTransferTransactionsLoading: false,
  assetTransferTransactionsPages: 1,
  // Asset Holders
  assetHolders: [],
  assetHoldersLoading: false,
  assetHoldersPages: 1,
  // Assets List
  assets: [],
  assetsLoading: false,
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
      // const { pages: assetHoldersPages, results: assetHolders } = payload;
      // TEMP: API missing pagination, just returns results for now
      const assetHolders = payload;
      const assetHoldersPages = 1;

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
    GET_ASSETS_TRANSACTIONS (Admin)
    -------------------*/
    [`${GET_ASSET_ADMIN_TRANSACTIONS}_${REQUEST}`](state) {
      return {
        ...state,
        assetAdminTransactionsLoading: true,
      };
    },
    [`${GET_ASSET_ADMIN_TRANSACTIONS}_${SUCCESS}`](state, { payload }) {
      const { pages: assetAdminTransactionsPages, results: assetAdminTransactions } = payload;
      return {
        ...state,
        assetAdminTransactions,
        assetAdminTransactionsPages,
        assetAdminTransactionsLoading: false,
      };
    },
    [`${GET_ASSET_ADMIN_TRANSACTIONS}_${FAILURE}`](state) {
      return {
        ...state,
        assetAdminTransactionsLoading: false,
      };
    },
    /* -----------------
    GET_ASSETS_TRANSACTIONS (Transfer)
    -------------------*/
    [`${GET_ASSET_TRANSFER_TRANSACTIONS}_${REQUEST}`](state) {
      return {
        ...state,
        assetTransferTransactionsLoading: true,
      };
    },
    [`${GET_ASSET_TRANSFER_TRANSACTIONS}_${SUCCESS}`](state, { payload }) {
      const { pages: assetTransferTransactionsPages, results: assetTransferTransactions } = payload;
      return {
        ...state,
        assetTransferTransactions,
        assetTransferTransactionsPages,
        assetTransferTransactionsLoading: false,
      };
    },
    [`${GET_ASSET_TRANSFER_TRANSACTIONS}_${FAILURE}`](state) {
      return {
        ...state,
        assetTransferTransactionsLoading: false,
      };
    },
    /* -----------------
    GET_ASSETS_LIST
    -------------------*/
    [`${GET_ASSETS_LIST}_${REQUEST}`](state) {
      return {
        ...state,
        assetsLoading: true,
      };
    },
    [`${GET_ASSETS_LIST}_${SUCCESS}`](state, { payload: assets }) {
      return {
        ...state,
        assets,
        assetsLoading: false,
      };
    },
    [`${GET_ASSETS_LIST}_${FAILURE}`](state) {
      return {
        ...state,
        assetsLoading: false,
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
