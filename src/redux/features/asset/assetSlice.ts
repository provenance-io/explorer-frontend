import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import qs from 'query-string';
import { RootState } from 'redux/app/store';
import { ASSET_DETAIL_URL, ASSETS_LIST_URL, TX_INFO_URL, ASSETS_DIST_URL } from '../../../consts';
import { formatDenom, setCookie } from '../../../utils';
import { ajax } from '../api';

interface AssetInfo {
  attributes?: {
    attribute: string;
    data: string;
  }[];
  holderCount?: number;
  holdingAccount?: string;
  managingAccounts?: {
    allowGovControl: boolean;
    managers: {
      [key: string]: string[];
    };
  };
  marker?: string;
  markerStatus?: string;
  markerType?: string;
  metadata?: {
    description?: string;
    denomUnits?: {
      denom: string;
      exponent?: number;
    }[];
  };
  mintable?: boolean;
  supply?: {
    amount: string;
    denom: string;
    pricePerToken: {
      amount: string;
      denom: string;
    };
    totalBalancePrice: {
      amount: string;
      denom: string;
    };
  };
  tokens?: {
    fungibleCount: number;
    nonFungibleCount: number;
  };
  txnCount?: number;
}

export interface TransactionsModule {
  pages: number;
  results: {
    txHash?: string;
    block?: number;
    msg?: {
      msgCount: number;
      displayMsgType: string;
    };
    monikers?: {
      [key: string]: string;
    };
    time?: string;
    fee?: {
      amount: string;
      denom: string;
    };
    signers: {
      signers: string[];
      threshold: number | null;
    };
    status?: string;
    feepayer?: {
      type: string;
      address: string;
    };
  }[];
  total: number;
  rollupTotals?: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
}

interface AssetHolders {
  pages: number;
  results: {
    balance: {
      count: string;
      denom: string;
      total: string;
    };
    ownerAddress: string;
  }[];
  rollupTotals?: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

interface AllAssets {
  pages: number;
  results: {
    holdingAccount?: string;
    lastTxTimestamp: string;
    marker?: string;
    markerType?: string;
    mintable?: boolean;
    status?: string;
    supply?: {
      amount: string;
      denom: string;
      pricePerToken: {
        amount: string;
        denom: string;
      };
      totalBalancePrice: {
        amount: string;
        denom: string;
      };
    };
  };
  rollupTotals?: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

interface AssetMetadata {
  description: string;
  denomUnits: {
    denom: string;
    exponent?: number;
  }[];
  base: string;
  display: string;
  name: string;
  symbol: string;
}

interface AssetDist {
  amount: {
    amount: string;
    denom: string;
  };
  amountHash?: string;
  percentTotal?: string;
  percent: string;
  range: string;
}

interface AssetState {
  // Asset Information
  assetInfo: AssetInfo;
  pricePerToken: string;
  totalBalancePrice: string;
  assetInfoLoading: boolean;
  // Asset Transactions (Admin)
  assetAdminTransactions: TransactionsModule['results'];
  assetAdminTransactionsLoading: boolean;
  assetAdminTransactionsPages: TransactionsModule['pages'];
  // Asset Transactions (Transfer)
  assetTransferTransactions: TransactionsModule['results'];
  assetTransferTransactionsLoading: boolean;
  assetTransferTransactionsPages: TransactionsModule['pages'];
  // Asset Holders
  assetHolders: AssetHolders['results'];
  assetHoldersLoading: boolean;
  assetHoldersPages: AssetHolders['pages'];
  // Assets List
  assets: AllAssets['results'][];
  assetsPages: number;
  assetsLoading: boolean;
  // Asset Metadata
  assetMetadata: AssetMetadata[];
  assetMetadataLoading: boolean;
  assetMetadataFailed: boolean;
  // Assets distribution
  assetsDist: AssetDist[];
  assetsDistLoading: boolean;
}

export const initialState: AssetState = {
  // Asset Information
  assetInfo: {},
  pricePerToken: '',
  totalBalancePrice: '',
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
  assetsPages: 0,
  assetsLoading: false,
  // Asset Metadata
  assetMetadata: [],
  assetMetadataLoading: false,
  assetMetadataFailed: false,
  // Assets distribution
  assetsDist: [],
  assetsDistLoading: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_ASSET_INFO = 'GET_ASSET_INFO';
export const GET_ASSETS_LIST = 'GET_ASSETS_LIST';
export const GET_ASSET_ADMIN_TRANSACTIONS = 'GET_ASSET_ADMIN_TRANSACTIONS';
export const GET_ASSET_TRANSFER_TRANSACTIONS = 'GET_ASSET_TRANSFER_TRANSACTIONS';
export const GET_ASSET_HOLDERS = 'GET_ASSET_HOLDERS';
export const GET_ASSET_METADATA = 'GET_ASSET_METADATA';
export const GET_ASSETS_DIST = 'GET_ASSETS_DIST';

/* -----------------
** ACTIONS
-------------------*/
export const getAssetInfo = createAsyncThunk(GET_ASSET_INFO, (id: string) =>
  ajax({
    url: `${ASSET_DETAIL_URL}/detail/${id}`,
  })
);

export const getAssetsList = createAsyncThunk(
  GET_ASSETS_LIST,
  ({ page = 1, count = 10 }: { page?: number; count?: number }) =>
    ajax({
      url: `${ASSETS_LIST_URL}?${qs.stringify({ page, count })}`,
    })
);

export const getAssetHolders = createAsyncThunk(
  GET_ASSET_HOLDERS,
  ({ assetId, page = 1, count = 10 }: { assetId: string; page?: number; count?: number }) =>
    ajax({
      url: `${ASSET_DETAIL_URL}/holders?${qs.stringify({ id: assetId, page, count })}`,
    })
);

export const getAssetAdminTransactions = createAsyncThunk(
  GET_ASSET_ADMIN_TRANSACTIONS,
  ({ denom, page = 1, count = 10 }: { denom: string; page?: number; count?: number }) =>
    ajax({
      url: `${TX_INFO_URL}/module/ASSET?${qs.stringify({ denom, page, count })}`,
    })
);

export const getAssetTransferTransactions = createAsyncThunk(
  GET_ASSET_TRANSFER_TRANSACTIONS,
  ({ denom, page = 1, count = 10 }: { denom: string; page?: number; count?: number }) =>
    ajax({
      url: `${TX_INFO_URL}/module/TRANSFER?${qs.stringify({ denom, page, count })}`,
    })
);

export const getAssetMetadata = createAsyncThunk(GET_ASSET_METADATA, () =>
  ajax({
    url: `${ASSET_DETAIL_URL}/metadata`,
  })
);

export const getAssetsDist = createAsyncThunk(GET_ASSETS_DIST, () =>
  ajax({
    url: `${ASSETS_DIST_URL}`,
  })
);

export const assetActions = {
  getAssetInfo,
  getAssetAdminTransactions,
  getAssetTransferTransactions,
  getAssetHolders,
  getAssetsList,
  getAssetMetadata,
  getAssetsDist,
};

/* -----------------
** SLICE
-------------------*/
export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
      GET_ASSET_HOLDERS
      -------------------*/
      .addCase(getAssetHolders.pending, (state) => {
        state.assetHoldersLoading = true;
      })
      .addCase(getAssetHolders.fulfilled, (state, { payload }) => {
        state.assetHoldersLoading = false;
        state.assetHoldersPages = payload.data.pages;
        state.assetHolders = payload.data.results;
      })
      .addCase(getAssetHolders.rejected, (state) => {
        state.assetHoldersLoading = false;
      })
      /* -----------------
      GET_ASSETS_TRANSACTIONS (Admin)
      -------------------*/
      .addCase(getAssetAdminTransactions.pending, (state) => {
        state.assetAdminTransactionsLoading = true;
      })
      .addCase(getAssetAdminTransactions.fulfilled, (state, { payload }) => {
        state.assetAdminTransactionsLoading = false;
        state.assetAdminTransactions = payload.data.results;
        state.assetAdminTransactionsPages = payload.data.pages;
      })
      .addCase(getAssetAdminTransactions.rejected, (state) => {
        state.assetAdminTransactionsLoading = false;
      })
      /* -----------------
      GET_ASSETS_TRANSACTIONS (Transfer)
      -------------------*/
      .addCase(getAssetTransferTransactions.pending, (state) => {
        state.assetTransferTransactionsLoading = true;
      })
      .addCase(getAssetTransferTransactions.fulfilled, (state, { payload }) => {
        state.assetTransferTransactionsLoading = false;
        state.assetTransferTransactions = payload.data.results;
        state.assetTransferTransactionsPages = payload.data.pages;
      })
      .addCase(getAssetTransferTransactions.rejected, (state) => {
        state.assetTransferTransactionsLoading = false;
      })
      /* -----------------
      GET_ASSETS_LIST
      -------------------*/
      .addCase(getAssetsList.pending, (state) => {
        state.assetsLoading = true;
      })
      .addCase(getAssetsList.fulfilled, (state, { payload }) => {
        state.assetsLoading = false;
        state.assets = payload.data.results.map((result: AllAssets['results']) => ({
          ...result,
          lastTxTimestamp: result.lastTxTimestamp === 'null' ? null : result.lastTxTimestamp,
          pricePerToken: result.supply?.pricePerToken
            ? `$${formatDenom(
                Number(result.supply.pricePerToken.amount),
                result.supply.pricePerToken.denom,
                {
                  decimal: 2,
                  minimumFractionDigits: 2,
                }
              )}`
            : '-- --',
          totalBalancePrice: result.supply?.totalBalancePrice
            ? `$${formatDenom(
                Number(result.supply.totalBalancePrice.amount),
                result.supply.totalBalancePrice.denom,
                { decimal: 2, minimumFractionDigits: 2 }
              )}`
            : '-- --',
        }));
        state.assetsPages = payload.data.pages;
      })
      .addCase(getAssetsList.rejected, (state) => {
        state.assetsLoading = false;
      })
      /* -----------------
      GET_ASSETS_INFO
      -------------------*/
      .addCase(getAssetInfo.pending, (state) => {
        state.assetInfoLoading = true;
      })
      .addCase(getAssetInfo.fulfilled, (state, { payload }) => {
        state.assetInfoLoading = false;
        state.assetInfo = payload.data;
        state.pricePerToken = payload.data.supply.pricePerToken
          ? formatDenom(
              payload.data.supply.pricePerToken.amount,
              payload.data.supply.pricePerToken.denom,
              { decimal: 2, minimumFractionDigits: 2 }
            )
          : '-- --';
        state.totalBalancePrice = payload.data.supply.totalBalancePrice
          ? formatDenom(
              payload.data.supply.totalBalancePrice.amount,
              payload.data.supply.totalBalancePrice.denom,
              { decimal: 2, minimumFractionDigits: 2 }
            )
          : '-- --';
      })
      .addCase(getAssetInfo.rejected, (state) => {
        state.assetInfoLoading = false;
      })
      /* -----------------
      GET_ASSET_METADATA
      -------------------*/
      .addCase(getAssetMetadata.pending, (state) => {
        state.assetMetadataLoading = true;
        state.assetMetadataFailed = false;
      })
      .addCase(getAssetMetadata.fulfilled, (state, { payload }) => {
        // Used by currencyFormat
        window.localStorage.setItem('assetMetadata', JSON.stringify(payload.data));
        setCookie('assetMetadata', JSON.stringify(payload.data), 5);
        window.localStorage.setItem('assetMetadata', JSON.stringify(payload.data));
        state.assetMetadataLoading = false;
        state.assetMetadata = payload.data;
      })
      .addCase(getAssetMetadata.rejected, (state) => {
        state.assetMetadataLoading = false;
        state.assetMetadataFailed = true;
      })
      /* -----------------
      GET_ASSETS_DIST
      -------------------*/
      .addCase(getAssetsDist.pending, (state) => {
        state.assetsDistLoading = true;
      })
      .addCase(getAssetsDist.fulfilled, (state, { payload }) => {
        state.assetsDistLoading = false;
        state.assetsDist = payload.data.map((a: AssetDist) => {
          a.amountHash = formatDenom(Number(a.amount.amount), a.amount.denom, { decimal: 0 });
          const percentTotal = parseFloat(a.percent) * 100;
          a.percentTotal =
            (percentTotal < 0.01 ? percentTotal.toFixed(5) : percentTotal.toFixed(2)) + '%';
          return a;
        });
      })
      .addCase(getAssetsDist.rejected, (state) => {
        state.assetsDistLoading = false;
      });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectAsset = (state: RootState) => state.asset;

export default assetSlice.reducer;
