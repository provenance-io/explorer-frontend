import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import qs from 'query-string';
import { RootState } from "redux/app/store";
import {
  TX_INFO_URL,
  TXS_RECENT_URL,
  TX_HISTORY_URL,
  TXS_BY_BLOCK_URL,
  TXS_BY_ADDRESS_URL,
  TX_TYPES_URL,
} from 'consts';
import { isEmpty, capitalize } from 'utils';
import { ajax } from "../api";

interface TxInfo {
  codespace: string;
  errorCode: number;
  errorLog: string;
  fee: {
    fees: {
      amount: string;
      denom: string;
      msgType: string;
    }[];
    type: string;
  }[];
  feepayer: {
    address: string;
    type: string;
  };
  gas: {
    gasPrice: {
      amount: string;
      denom: string;
    };
    gasUsed: number;
    gasWanted: number;
  },
  height: number;
  memo: string;
  monikers: {
    [key: string]: string;
  };
  signers: {
    signers: string[];
    threshold: number;
  },
  status: string;
  time: string;
  txHash: string;
};

interface TxMsgs {
  pages: number;
  results: {
    msg: {
      [key: string]: {};
    };
    type: string;
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
};

interface TxRecent {
  pages: number;
  results: {
    block: number;
    fee: {
      amount: string;
      denom: string;
    };
    feepayer: {
      address: string;
      type: string;
    };
    monikers: {
      [key: string]: string;
    };
    msg: {
      displayMsgType: string,
      msgCount: number;
    },
    signers: {
      signers: string[];
      threshold: number;
    };
    status: string;
    time: string;
    txHash: string;
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string,
      denom: string
    };
  };
  total: number;
};

export interface TxHistory {
  date: string;
  numberTxs: number;
};

interface TxTypes {
  [key: string]: { 
    isDefault?: boolean;
    title: string;
    options?: { 
      [key: string]: { 
        title: string,
        isDefault?: boolean;
      };
    };
  };
};

interface TxTypesNoFormat {
  module: string;
  type: string;
};

interface TxMsgTypes {
  [key: string]: {
    isDefault?: boolean;
    title: string;
  };
};

interface TxByBlock extends TxRecent {};
interface TxByAddress extends TxRecent {};
interface TxByModule extends TxRecent {};
interface TxByNft extends TxRecent {};

interface TxState {
  // Txs
  txInfo: TxInfo;
  txsInfoLoading: boolean;
  // Recent Txs
  txs: TxRecent["results"];
  txsPages: TxRecent["pages"];
  recentTxsCount: TxRecent["total"];
  txsRecentLoading: boolean;
  // Full explorer tx history
  txHistory: TxHistory[],
  txHistoryDayRange: number;
  txHistoryLoading: boolean;
  // Tx JSON
  txFullJSONLoading: boolean;
  txFullJSON: string;
  // Txs for a specific block
  txsByBlock: TxByBlock["results"];
  txsByBlockLoading: boolean;
  txsByBlockPages: TxByBlock["pages"];
  // Txs for a specific wallet address
  txsByAddress: TxByAddress["results"];
  txsByAddressLoading: boolean;
  txsByAddressPages: TxByAddress["pages"];
  // Tx Types (for filters)
  txTypesLoading: boolean;
  txTypes: TxTypes;
  txTypesNoFormat: TxTypesNoFormat[];
  // Tx Msgs
  txMsgs: { [key: string]: TxMsgs["results"] };
  txMsgsLoading: boolean;
  txMsgsPages: TxMsgs["pages"];
  txMsgsTotal: TxMsgs["total"];
  // Tx Msg Types
  txMsgTypes: TxMsgTypes;
  txMsgTypesLoading: boolean;
  // TX Modules
  txByModule: TxByModule["results"]
  txByModuleLoading: boolean;
  txByModulePages: TxByModule["pages"];
  // TX by NFT
  txByNft: TxByNft["results"];
  txByNftLoading: boolean;
  txByNftPages: TxByNft["pages"];
};

export const initialState: TxState = {
  // Txs
  txInfo: {
    codespace: "",
    errorCode: 0,
    errorLog: "",
    fee: [],
    feepayer: {
      address: "",
      type: "",
    },
    gas: {
      gasPrice: {
        amount: "",
        denom: "",
      },
      gasUsed: 0,
      gasWanted: 0,
    },
    height: 0,
    memo: "",
    monikers: {},
    signers: {
      signers: [],
      threshold: 0,
    },
    status: "",
    time: "",
    txHash: "",
  },
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
  txTypesNoFormat: [],
  // Tx Msgs
  txMsgs: {},
  txMsgsLoading: false,
  txMsgsPages: 0,
  txMsgsTotal: 0,
  // Tx Msg Types
  txMsgTypes: {},
  txMsgTypesLoading: false,
  // TX Modules
  txByModule: [],
  txByModuleLoading: false,
  txByModulePages: 0,
  // TX by NFT
  txByNft: [],
  txByNftLoading: false,
  txByNftPages: 0,
};

/* -----------------
** TYPES
-------------------*/
export const GET_TX_INFO = 'TX::GET_TX_INFO';
export const GET_TXS_RECENT = 'TX::GET_TXS_RECENT';
export const GET_TX_HISTORY = 'TX::GET_TX_HISTORY';
export const GET_TXS_BY_BLOCK = 'TX::GET_TXS_BY_BLOCK';
export const GET_TXS_BY_ADDRESS = 'TX::GET_TXS_BY_ADDRESS';
export const GET_TX_FULL_JSON = 'TX::GET_TX_FULL_JSON';
export const GET_TX_TYPES = 'TX::GET_TX_TYPES';
export const GET_TX_MSGS = 'TX::GET_TX_MSGS';
export const GET_TX_MSG_TYPES = 'TX::GET_TX_MSG_TYPES';
export const GET_TX_BY_MODULE = 'TX::GET_TX_BY_MODULE';
export const GET_TXS_BY_NFT = 'TX::GET_TXS_BY_NFT';

/* -----------------
** ACTIONS
-------------------*/
export const getTxsRecent = createAsyncThunk(
  GET_TXS_RECENT,
  ({
    count = 10,
    page = 1,
    type = '',
    status = '',
    toDate,
    fromDate,
  } : {
    count: number,
    page: number,
    type: string,
    status: string,
    toDate: string,
    fromDate: string,
  }) =>
    ajax({
      url: `${TXS_RECENT_URL}?count=${count}&page=${page}${type ? `&msgType=${type}` : ''}${
        status ? `&txStatus=${status.toUpperCase()}` : ''
      }${toDate ? `&toDate=${toDate}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}`,
    })
);

export const getTxsByAddress = createAsyncThunk(
  GET_TXS_BY_ADDRESS,
  ({
    count = 10,
    page = 1,
    type = '',
    status = '',
    address,
  } : {
    count: number,
    page: number,
    type: string,
    status: string,
    address: string,
  }) =>
    ajax({
      url: `${TXS_BY_ADDRESS_URL}/${address}?count=${count}&page=${page}${
        type ? `&msgType=${type}` : ''
      }${status ? `&txStatus=${status.toUpperCase()}` : ''}`,
    })
);

export const getTxsByBlock = createAsyncThunk(
  GET_TXS_BY_BLOCK,
  ({
    blockheight,
    count = 10,
    page = 1,
  } : {
    blockheight: number,
    count: number,
    page: number,
  }) =>
    ajax({
      url: `${TXS_BY_BLOCK_URL}/${blockheight}?count=${count}&page=${page}`,
    })
);

export const getTxInfo = createAsyncThunk(
  GET_TX_INFO,
  (txHash: string) =>
    ajax({
      url: `${TX_INFO_URL}/${txHash}`,
    })
);

export const getTxHistory = createAsyncThunk(
  GET_TX_HISTORY,
  ({
    toDate,
    fromDate,
    granularity = 'day'
  } : {
    toDate: string,
    fromDate: string,
    granularity: string,
  }) =>
    ajax({
      url: `${TX_HISTORY_URL}?toDate=${toDate}&fromDate=${fromDate}&granularity=${granularity.toUpperCase()}`,
    })
);

export const getTxFullJSON = createAsyncThunk(
  GET_TX_FULL_JSON,
  (txHash: string) =>
    ajax({
      url: `${TX_INFO_URL}/${txHash}/json`,
    })
);

export const getTxTypes = createAsyncThunk(
  GET_TX_TYPES,
  () => 
    ajax({
      url: TX_TYPES_URL,
    })
);

export const getTxMsgs = createAsyncThunk(
  GET_TX_MSGS,
  ({
    txHash,
    count = 10,
    page = 1,
    msgType = '',
  } : {
    txHash: string,
    count: number,
    page: number,
    msgType: string,
  }) =>
    ajax({
      url: `${TX_INFO_URL}/${txHash}/msgs?${qs.stringify({ page, count, msgType })}`,
    })
);

export const getTxMsgTypes = createAsyncThunk(
  GET_TX_MSG_TYPES,
  (txHash: string) =>
    ajax({
      url: `${TX_INFO_URL}/types/tx/${txHash}`,
    })
);

export const getTxByModule = createAsyncThunk(
  GET_TX_BY_MODULE,
  ({
    module,
    ...rest
  } : {
    module: string,
  }) =>
    ajax({
      url: `${TX_INFO_URL}/module/${module}${!isEmpty(rest) ? `?${qs.stringify(rest)}` : ''}`,
    })
);

export const getTxsByNft = createAsyncThunk(
  GET_TXS_BY_NFT,
  ({
    addr,
    count = 10,
    page = 1,
    ...rest
  } : {
    addr: string,
    count: number,
    page: number,
  }) =>
    ajax({
      url: `${TX_INFO_URL}/nft/${addr}?${qs.stringify({ count, page, ...rest })}`,
    })
);

/* -----------------
** SLICE
-------------------*/
export const txSlice = createSlice({
  name: 'tx',
  initialState,
  reducers: {
    resetTxMsgs(state, action: PayloadAction<string>) {
      const { [action.payload]: removedItem, ...txMsgs } = state.txMsgs;
      state.txMsgs = txMsgs;
    },

    setRecentTxsCount(state, action: PayloadAction<number>) {
      state.recentTxsCount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    /* -----------------
    GET_TX_TYPES
    -------------------*/
    .addCase(getTxTypes.pending, (state) => {
      state.txTypesLoading = true;
    })
    .addCase(getTxTypes.fulfilled, (state, { payload }) => {
      // Initial value of "all"
      const txTypes: TxTypes = {
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
      payload.data.forEach(({ module, type } : { module: string, type: string }) => {
        txTypes[module] = { title: capitalize(module), options: {} };
      });
      // Loop through each type from API and add to types
      payload.data.forEach(({ module, type } : { module: string, type: string }) => {
        txTypes[module].options = {
          [type]: { title: capitalize(type) },
          ...txTypes[module].options,
        };
      });
      state.txTypesLoading = false;
      state.txTypes = txTypes;
      state.txTypesNoFormat = payload.data;
    })
    .addCase(getTxTypes.rejected, (state) => {
      state.txTypesLoading = false;
    })
    /* -----------------
    GET_TX_FULL_JSON
    -------------------*/
    .addCase(getTxFullJSON.pending, (state) => {
      state.txFullJSONLoading = true;
    })
    .addCase(getTxFullJSON.fulfilled, (state, { payload }) => {
      state.txFullJSONLoading = false;
      state.txFullJSON = payload.data;
    })
    .addCase(getTxFullJSON.rejected, (state) => {
      state.txFullJSONLoading = false;
    })
    /* -----------------
    GET_TXS_BY_BLOCK
    -------------------*/
    .addCase(getTxsByBlock.pending, (state) => {
      state.txsByBlockLoading = true;
    })
    .addCase(getTxsByBlock.fulfilled, (state, { payload }) => {
      state.txsByBlockLoading = false;
      state.txsByBlock = payload.data.results;
      state.txsByBlockPages = payload.data.pages;
    })
    .addCase(getTxsByBlock.rejected, (state) => {
      state.txsByBlockLoading = false;
    })
    /* -----------------
    GET_TXS_BY_ADDRESS
    -------------------*/
    .addCase(getTxsByAddress.pending, (state) => {
      state.txsByAddressLoading = true;
    })
    .addCase(getTxsByAddress.fulfilled, (state, { payload }) => {
      state.txsByAddressLoading = false;
      state.txsByAddress = payload.data.results;
      state.txsByAddressPages = payload.data.pages;
    })
    .addCase(getTxsByAddress.rejected, (state) => {
      state.txsByAddressLoading = false;
    })
    /* -----------------
    GET_TXS_RECENT
    -------------------*/
    .addCase(getTxsRecent.pending, (state) => {
      state.txsRecentLoading = true;
    })
    .addCase(getTxsRecent.fulfilled, (state, { payload }) => {
      state.txsRecentLoading = false;
      state.txs = payload.data.results;
      state.txsPages = payload.data.pages;
    })
    .addCase(getTxsRecent.rejected, (state) => {
      state.txsRecentLoading = false;
    })
    /* -----------------
    GET_TX_INFO
    -------------------*/
    .addCase(getTxInfo.pending, (state) => {
      state.txsInfoLoading = true;
    })
    .addCase(getTxInfo.fulfilled, (state, { payload }) => {
      state.txsInfoLoading = false;
      state.txInfo = payload.data;
    })
    .addCase(getTxInfo.rejected, (state) => {
      state.txsInfoLoading = false;
    })
    /* -----------------
    GET_TX_HISTORY
    -------------------*/
    .addCase(getTxHistory.pending, (state) => {
      state.txHistoryLoading = true;
    })
    .addCase(getTxHistory.fulfilled, (state, { payload }) => {
      state.txHistoryLoading = false;
      state.txHistory = payload.data.reverse();
    })
    .addCase(getTxHistory.rejected, (state) => {
      state.txHistoryLoading = false;
    })
    /* -----------------
    GET_TX_MSGS
    -------------------*/
    .addCase(getTxMsgs.pending, (state) => {
      state.txMsgsLoading = true;
    })
    .addCase(getTxMsgs.fulfilled, (state, { payload, meta }) => {
      const { txHash } = meta.arg;
      const prevMsgs = state.txMsgs[txHash] || [];
      state.txMsgs = {
        ...state.txMsgs,
        [txHash]: [...prevMsgs, ...payload.data.results],
      };
      state.txMsgsLoading = false;
      state.txMsgsTotal = payload.data.total;
    })
    .addCase(getTxMsgs.rejected, (state) => {
      state.txMsgsLoading = false;
    })
    /* -----------------
    GET_TX_MSGS_TYPES
    -------------------*/
    .addCase(getTxMsgTypes.pending, (state) => {
      state.txMsgTypesLoading = true;
    })
    .addCase(getTxMsgTypes.fulfilled, (state, { payload }) => {
      // Initial value of "all"
      const txMsgTypes: TxMsgTypes = {
        allTxTypes: { isDefault: true, title: 'All Tx Types' },
      };
      // Loop through each module from API and add to types
      payload.data.forEach(({ type } : { [key: string]: string} ) => {
        txMsgTypes[type] = { title: capitalize(type) };
      });
      state.txMsgTypesLoading = false;
      state.txMsgTypes = txMsgTypes;
    })
    .addCase(getTxMsgTypes.rejected, (state) => {
      state.txMsgTypesLoading = false;
    })
    /* -----------------
    GET_TX_BY_MODULE
    -------------------*/
    .addCase(getTxByModule.pending, (state) => {
      state.txByModuleLoading = true;
    })
    .addCase(getTxByModule.fulfilled, (state, { payload }) => {
      state.txByModuleLoading = false;
      state.txByModule = payload.data.results;
      state.txByModulePages = payload.data.pages;
    })
    .addCase(getTxByModule.rejected, (state) => {
      state.txByModuleLoading = false;
    })
    /* -----------------
    GET_TXS_BY_NFT
    -------------------*/
    .addCase(getTxsByNft.pending, (state) => {
      state.txByNftLoading = true;
    })
    .addCase(getTxsByNft.fulfilled, (state, { payload }) => {
      state.txByNftLoading = false;
      state.txByNft = payload.data.results;
      state.txByNftPages = payload.data.pages;
    })
    .addCase(getTxsByNft.rejected, (state) => {
      state.txByNftLoading = false;
    });
  },
});

/* -----------------
BUILD ACTIONS
-------------------*/
const {
  resetTxMsgs,
  setRecentTxsCount
} = txSlice.actions;

export const txActions = {
  getTxsRecent,
  getTxsByAddress,
  getTxsByBlock,
  getTxInfo,
  getTxHistory,
  getTxFullJSON,
  getTxTypes,
  getTxMsgs,
  getTxMsgTypes,
  getTxByModule,
  getTxsByNft,
  resetTxMsgs,
  setRecentTxsCount,
};

/* -----------------
SELECTORS
-------------------*/
export const selectTx = (state: RootState) => state.tx;

export default txSlice.reducer;