import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import qs from 'query-string';
import { RootState } from '../../app/store';
import {
  BLOCK_INFO_URL,
  BLOCKS_RECENT_URL,
  BLOCK_SPOTLIGHT_URL,
  BLOCK_HEIGHT_URL,
} from '../../../consts';
import { ajax } from '../api';

interface BlockInfo {
  height?: number;
  hash?: string;
  time?: string;
  proposerAddress?: string;
  moniker?: string;
  icon?: string | null;
  votingPower?: {
    count: number;
    total: number;
  };
  validatorCount?: {
    count: number;
    total: number;
  };
  txNum?: number;
}

interface BlocksRecent {
  pages: number;
  results: BlockInfo[];
  rollupTotals: {};
  total: number;
}

interface BlockSpotlight {
  avgBlockTime?: number;
  bondedTokens?: {
    count: string;
    denom: string;
    total: string;
  };
  latestBlock: {
    hash?: string;
    height?: number;
    icon?: string;
    moniker?: string;
    proposerAddress?: string;
    time?: string;
    txNum?: number;
    validatorCount?: {
      count: number;
      total: number;
    };
    votingPower?: {
      count: number;
      total: number;
    };
  };
  totalAum?: {
    amount: string;
    denom: string;
  };
  totalTxCount?: number;
}

export interface BlockState {
  blocksHeight: BlockInfo['height'];
  blocksHeightLoading: boolean;
  // Block Info
  blockInfo: BlockInfo;
  blockInfoLoading: boolean;
  // Blocks Recent
  blocks: BlocksRecent['results'];
  blockPages: number;
  blocksRecentLoading: boolean;
  // Spotlight
  blockSpotlightLoading: boolean;
  blockLatest: BlockSpotlight;
  blockHeight: BlockSpotlight['latestBlock']['height'];
  blockSpotlightFailed: boolean;
  recentBlocksCount: number;
}

export const initialState: BlockState = {
  blocksHeight: 0,
  blocksHeightLoading: false,
  // Block Info
  blockInfo: {},
  blockInfoLoading: false,
  // Blocks Recent
  blocks: [],
  blockPages: 0,
  blocksRecentLoading: false,
  // Spotlight
  blockSpotlightLoading: false,
  blockLatest: {
    latestBlock: {},
  },
  blockHeight: 0,
  blockSpotlightFailed: false,
  recentBlocksCount: 10,
};

/* -----------------
** TYPES
-------------------*/
export const GET_BLOCK_INFO = 'GET_BLOCK_INFO';
export const GET_BLOCKS_HEIGHT = 'GET_BLOCKS_HEIGHT';
export const GET_BLOCKS_RECENT = 'GET_BLOCKS_RECENT';
export const GET_BLOCK_SPOTLIGHT = 'GET_BLOCK_SPOTLIGHT';
export const SET_RECENT_BLOCKS_COUNT = 'SET_RECENT_BLOCKS_COUNT';

/* -----------------
** ACTIONS
-------------------*/
export const getBlocksHeight = createAsyncThunk(GET_BLOCKS_HEIGHT, () =>
  ajax({
    url: BLOCK_HEIGHT_URL,
  })
);

export const getBlocksRecent = createAsyncThunk(
  GET_BLOCKS_RECENT,
  ({ count = 10, page = 1 }: { count: number; page: number }) =>
    ajax({
      url: `${BLOCKS_RECENT_URL}?${qs.stringify({ page, count })}`,
    })
);

export const getBlockInfo = createAsyncThunk(GET_BLOCK_INFO, (blockHeight: number) =>
  ajax({
    url: `${BLOCK_INFO_URL}/${blockHeight}`,
  })
);

export const getBlockSpotlight = createAsyncThunk(GET_BLOCK_SPOTLIGHT, () =>
  ajax({
    url: BLOCK_SPOTLIGHT_URL,
  })
);

/* -----------------
** SLICE
-------------------*/
export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setRecentBlocksCount(state, action: PayloadAction<number>) {
      state.recentBlocksCount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      /* -----------------
      GET_BLOCK_SPOTLIGHT
      -------------------*/
      .addCase(getBlockSpotlight.pending, (state) => {
        state.blockSpotlightLoading = true;
        state.blockSpotlightFailed = false;
      })
      .addCase(getBlockSpotlight.fulfilled, (state, { payload }) => {
        state.blockSpotlightLoading = false;
        state.blockSpotlightFailed = false;
        state.blockLatest = payload.data;
        state.blockHeight = payload.data.latestBlock?.height;
      })
      .addCase(getBlockSpotlight.rejected, (state) => {
        state.blockSpotlightLoading = false;
        state.blockSpotlightFailed = true;
      })
      /* -----------------
      GET_BLOCKS_RECENT
      -------------------*/
      .addCase(getBlocksRecent.pending, (state) => {
        state.blocksRecentLoading = true;
      })
      .addCase(getBlocksRecent.fulfilled, (state, { payload }) => {
        state.blocksRecentLoading = false;
        state.blocks = payload.data.results;
        state.blockPages = payload.data.pages;
      })
      .addCase(getBlocksRecent.rejected, (state) => {
        state.blocksRecentLoading = false;
      })
      /* -----------------
      GET_BLOCKS_HEIGHT
      -------------------*/
      .addCase(getBlocksHeight.pending, (state) => {
        state.blocksHeightLoading = true;
      })
      .addCase(getBlocksHeight.fulfilled, (state, { payload }) => {
        state.blocksHeightLoading = false;
        state.blocksHeight = payload.data.height;
      })
      .addCase(getBlocksHeight.rejected, (state) => {
        state.blocksHeightLoading = false;
      })
      /* -----------------
      GET_BLOCK_INFO
      -------------------*/
      .addCase(getBlockInfo.pending, (state) => {
        state.blockInfoLoading = true;
      })
      .addCase(getBlockInfo.fulfilled, (state, { payload }) => {
        state.blockInfoLoading = false;
        state.blockInfo = payload.data;
      })
      .addCase(getBlockInfo.rejected, (state) => {
        state.blockInfoLoading = false;
      });
  },
});

/* -----------------
BUILD ACTIONS
-------------------*/
export const { setRecentBlocksCount } = blockSlice.actions;

export const blockActions = {
  getBlockInfo,
  getBlockSpotlight,
  getBlocksHeight,
  getBlocksRecent,
  ...blockSlice.actions,
};
/* -----------------
SELECTORS
-------------------*/
export const selectBlock = (state: RootState) => state.block;

export default blockSlice.reducer;
