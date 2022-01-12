import { handleActions } from 'redux-actions';
import { formatDenom, setCookie, getCookie } from 'utils';
import {
  GET_ASSET_INFO,
  GET_ASSET_ADMIN_TRANSACTIONS,
  GET_ASSET_TRANSFER_TRANSACTIONS,
  GET_ASSET_HOLDERS,
  GET_ASSETS_LIST,
  GET_ASSET_METADATA,
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
  // Asset Metadata
  assetMetadata: JSON.parse(getCookie('assetMetadata', true)) || [],
  assetMetadataLoading: false,
  assetMetadataFailed: false,
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
    [`${GET_ASSETS_LIST}_${SUCCESS}`](state, { payload }) {
      const { pages: assetsPages, results: assets } = payload;

      return {
        ...state,
        // assets,
        // remove the map once server returns null instead of 'null'
        assets: assets.map(result => ({
          ...result,
          lastTxTimestamp: result.lastTxTimestamp === 'null' ? null : result.lastTxTimestamp,
          pricePerToken: formatDenom(
            result.supply.pricePerToken.amount,
            result.supply.pricePerToken.denom,
            { decimal: 2, minimumFractionDigits: 2 }
          ),
          totalBalancePrice: formatDenom(
            result.supply.totalBalancePrice.amount,
            result.supply.totalBalancePrice.denom,
            { decimal: 2, minimumFractionDigits: 2 }
          ),
        })),
        assetsPages,
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
        pricePerToken: formatDenom(
          assetInfo.supply.pricePerToken.amount,
          assetInfo.supply.pricePerToken.denom,
          { decimal: 2, minimumFractionDigits: 2 }
        ),
        totalBalancePrice: formatDenom(
          assetInfo.supply.totalBalancePrice.amount,
          assetInfo.supply.totalBalancePrice.denom,
          { decimal: 2, minimumFractionDigits: 2 }
        ),
        assetInfoLoading: false,
      };
    },
    [`${GET_ASSET_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        assetInfoLoading: false,
      };
    },
    /* -----------------
    GET_ASSET_METADATA
    -------------------*/
    [`${GET_ASSET_METADATA}_${REQUEST}`](state) {
      return {
        ...state,
        assetMetadataLoading: true,
        assetMetadataFailed: false,
      };
    },
    [`${GET_ASSET_METADATA}_${SUCCESS}`](state, { payload: assetMetadata }) {
      setCookie('assetMetadata', JSON.stringify(assetMetadata), 5);

      return {
        ...state,
        assetMetadata,
        assetMetadataLoading: false,
      };
    },
    [`${GET_ASSET_METADATA}_${FAILURE}`](state) {
      return {
        ...state,
        assetMetadataLoading: false,
        assetMetadataFailed: true,
      };
    },
  },
  initialState
);

export default reducer;
