import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from 'query-string';
import { RootState } from "redux/app/store";
import {
  IBC_CHAIN_URL,
  IBC_CHANNEL_URL,
  IBC_BALANCES_DENOM_URL,
  IBC_RELAYERS_URL,
  IBC_CHANNEL_STATUS_URL,
  IBC_DENOMS_ALL_URL,
} from '../../../consts';
import { ajax } from "../api";

interface ChainBalances {
  balances: {
    balanceIn: {
      amount: string;
      denom: string;
    },
    balanceOut: {
      amount: string;
      denom: string;
    };
    denom: string;
    denomTrace: string;
    lastTx: string;
  }[];
  dstChainId: string;
  lastTx: string;
};

interface ChannelBalances {
  channels: {
    balances: {
        balanceIn: {
          amount: string;
          denom: string;
        },
        balanceOut: {
          amount: string;
          denom: string;
        },
        denom: string;
        denomTrace: string;
        lastTx: string;
      }[];
    dstChannel: {
      channel: string;
      port: string;
    },
    lastTx: string;
    srcChannel: {
      channel: string;
      port: string;
    }
  }[];
  dstChainId: string;
  lastTx: string;
};

interface DenomBalances {
  balanceIn: {
    amount: string;
    denom: string;
  };
  balanceOut: {
    amount: string;
    denom: string;
  };
  denom: string;
  denomTrace: string;
  lastTx: string;
};

interface ChannelRelayers {
  address: string;
  lastTimestamp: string;
  txCount: number;
};

interface ChannelStatus {
  channels: {
    dstChannel: {
      channel: string;
      port: string;
    };
    srcChannel: {
      channel: string;
      port: string;
    };
    status: string;
  }[];
  dstChainId: string;
};

interface DenomsAll {
  pages: number;
  results: {
    lastTxTimestamp: string;
    marker: string;
    supply: string;
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
};

interface IbcState {
  // Chain balances
  chainBalances: ChainBalances[];
  chainBalancesFailed: boolean;
  chainBalancesLoading: boolean;
  // Channel balances
  channelBalances: ChannelBalances[];
  channelBalancesFailed: boolean;
  channelBalancesLoading: boolean;
  // Denom balances
  denomBalances: DenomBalances[];
  denomBalancesFailed: boolean;
  denomBalancesLoading: boolean;
  // Channel Relayers
  channelRelayers: ChannelRelayers[];
  channelRelayersFailed: boolean;
  channelRelayersLoading: boolean;
  // Channel Status
  channelStatus: ChannelStatus[];
  channelStatusFailed: boolean;
  channelStatusLoading: boolean;
  // Denoms all
  denomsAll: DenomsAll["results"];
  denomsAllFailed: boolean;
  denomsAllLoading: boolean;
  denomsPages: DenomsAll["pages"];
  denomsTotal: DenomsAll["total"];
};

export const initialState: IbcState = {
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
  // Channel Relayers
  channelRelayers: [],
  channelRelayersFailed: false,
  channelRelayersLoading: false,
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

/* -----------------
** TYPES
-------------------*/
export const GET_CHAIN_BALANCES = 'IBC::GET_CHAIN_BALANCES';
export const GET_CHANNEL_BALANCES = 'IBC::GET_CHANNEL_BALANCES';
export const GET_DENOM_BALANCES = 'IBC::GET_DENOM_BALANCES';
export const GET_CHANNEL_RELAYERS = 'IBC::GET_CHANNEL_RELAYERS';
export const GET_CHANNEL_STATUS = 'IBC::GET_CHANNEL_STATUS';
export const GET_DENOMS_ALL = 'IBC::GET_DENOMS_ALL';

/* -----------------
** ACTIONS
-------------------*/
export const getChainBalances = createAsyncThunk(
  GET_CHAIN_BALANCES,
  () => 
    ajax({
      url: IBC_CHAIN_URL,
    })
);

export const getChannelBalances = createAsyncThunk(
  GET_CHANNEL_BALANCES,
  () => 
    ajax({
      url: IBC_CHANNEL_URL,
    })
);

export const getDenomBalances = createAsyncThunk(
  GET_DENOM_BALANCES,
  () => 
    ajax({
      url: IBC_BALANCES_DENOM_URL,
    })
);

export const getChannelRelayers = createAsyncThunk(
  GET_CHANNEL_RELAYERS,
  ({
    srcPort,
    srcChannel,
  } : {
    srcPort: string,
    srcChannel: string,
  }) => 
    ajax({
      url: `${IBC_RELAYERS_URL}${srcPort}/src_channel/${srcChannel}/relayers`,
    })
);

interface StatusProps {
  status: "STATE_CLOSED" | "STATE_INIT" | "STATE_OPEN" | "STATE_TRYOPEN" |
                   "STATE_UNINITIALIZED_UNSPECIFIED" | "UNRECOGNIZED" | "";
};

export const getChannelStatus = createAsyncThunk(
  GET_CHANNEL_STATUS,
  ({
    status = "" 
  } : StatusProps) =>
    ajax({
      url: `${IBC_CHANNEL_STATUS_URL}${status && `/?status=${status}`}`,
    })
);

export const getDenomsAll = createAsyncThunk(
  GET_DENOMS_ALL,
  ({
    page = 1,
    count = 1,
  } : {
    page: number,
    count: number,
  }) => 
    ajax({
      url: `${IBC_DENOMS_ALL_URL}/all?${qs.stringify({ page, count })}`,
    })
);

export const ibcActions = {
  getChainBalances,
  getChannelBalances,
  getDenomBalances,
  getChannelRelayers,
  getChannelStatus,
  getDenomsAll,
};
/* -----------------
** SLICE
-------------------*/
export const ibcSlice = createSlice({
  name: 'ibc',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    /* -----------------
    GET_CHAIN_BALANCES
    -------------------*/
    .addCase(getChainBalances.pending, (state) => {
      state.chainBalancesLoading = true;
      state.chainBalancesFailed = false;
    })
    .addCase(getChainBalances.fulfilled, (state, { payload }) => {
      state.chainBalancesLoading = false;
      state.chainBalances = payload.data;
      state.chainBalancesFailed = false;
    })
    .addCase(getChainBalances.rejected, (state) => {
      state.chainBalancesLoading = false;
      state.chainBalancesFailed = true;
    })
    /* -----------------
    GET_CHANNEL_BALANCES
    -------------------*/
    .addCase(getChannelBalances.pending, (state) => {
      state.channelBalancesLoading = true;
      state.channelBalancesFailed = false;
    })
    .addCase(getChannelBalances.fulfilled, (state, { payload }) => {
      state.channelBalancesLoading = false;
      state.channelBalances = payload.data;
      state.channelBalancesFailed = false;
    })
    .addCase(getChannelBalances.rejected, (state) => {
      state.channelBalancesLoading = false;
      state.channelBalancesFailed = true;
    })
    /* -----------------
    GET_DENOM_BALANCES
    -------------------*/
    .addCase(getDenomBalances.pending, (state) => {
      state.denomBalancesLoading = true;
      state.denomBalancesFailed = false;
    })
    .addCase(getDenomBalances.fulfilled, (state, { payload }) => {
      state.denomBalancesLoading = false;
      state.denomBalances = payload.data;
      state.denomBalancesFailed = false;
    })
    .addCase(getDenomBalances.rejected, (state) => {
      state.denomBalancesLoading = false;
      state.denomBalancesFailed = true;
    })
    /* -----------------
    GET_CHANNEL_RELAYERS
    -------------------*/
    .addCase(getChannelRelayers.pending, (state) => {
      state.channelRelayersLoading = true;
      state.channelRelayersFailed = false;
    })
    .addCase(getChannelRelayers.fulfilled, (state, { payload }) => {
      state.channelRelayersLoading = false;
      state.channelRelayers = payload.data;
      state.channelRelayersFailed = false;
    })
    .addCase(getChannelRelayers.rejected, (state) => {
      state.channelRelayersLoading = false;
      state.channelRelayersFailed = true;
    })
    /* -----------------
    GET_CHANNEL_STATUS
    -------------------*/
    .addCase(getChannelStatus.pending, (state) => {
      state.channelStatusLoading = true;
      state.channelStatusFailed = false;
    })
    .addCase(getChannelStatus.fulfilled, (state, { payload }) => {
      state.channelStatusLoading = false;
      state.channelStatus = payload.data;
      state.channelStatusFailed = false;
    })
    .addCase(getChannelStatus.rejected, (state) => {
      state.channelStatusLoading = false;
      state.channelStatusFailed = true;
    })
    /* -----------------
    GET_DENOMS_ALL
    -------------------*/
    .addCase(getDenomsAll.pending, (state) => {
      state.denomsAllLoading = true;
      state.denomsAllFailed = false;
    })
    .addCase(getDenomsAll.fulfilled, (state, { payload }) => {
      state.denomsAllLoading = false;
      state.denomsAll = payload.data.results;
      state.denomsPages = payload.data.pages;
      state.denomsTotal = payload.data.total;
      state.denomsAllFailed = false;
    })
    .addCase(getDenomsAll.rejected, (state) => {
      state.denomsAllLoading = false;
      state.denomsAllFailed = true;
    })
  }
})

/* -----------------
SELECTORS
-------------------*/
export const selectIbc = (state: RootState) => state.ibc;

export default ibcSlice.reducer;