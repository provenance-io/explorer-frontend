import { handleActions } from 'redux-actions';
import {
  GET_BLOCK_INFO,
  GET_BLOCKS_RECENT,
  GET_BLOCK_SPOTLIGHT,
  SET_RECENT_BLOCKS_COUNT,
  GET_BLOCKS_HEIGHT,
} from '../actions/blocksActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  blocksHeight: '',
  blocksHeightLoading: false,
  // Block Info
  blockInfo: {},
  blockInfoLoading: false,
  // Blocks Recent
  blocks: [],
  blockPages: 0,
  blocksRecentLoading: false,
  recentBlocksCount: 10,
  // Spotlight
  blockSpotlightLoading: false,
  avgBlockTime: 0,
  blockLatest: {},
  blockSpotlightFailed: false,
};

const reducer = handleActions(
  {
    [SET_RECENT_BLOCKS_COUNT](state, { payload: recentBlocksCount }) {
      return {
        ...state,
        recentBlocksCount,
      };
    },
    /* -----------------
    GET_BLOCK_SPOTLIGHT
    -------------------*/
    [`${GET_BLOCK_SPOTLIGHT}_${REQUEST}`](state) {
      return {
        ...state,
        blockSpotlightLoading: true,
        blockSpotlightFailed: false,
      };
    },
    [`${GET_BLOCK_SPOTLIGHT}_${SUCCESS}`](state, { payload: blockLatest }) {
      return {
        ...state,
        blockLatest,
        blockHeight: blockLatest?.latestBlock?.height,
        blockSpotlightLoading: false,
      };
    },
    [`${GET_BLOCK_SPOTLIGHT}_${FAILURE}`](state) {
      return {
        ...state,
        blockSpotlightLoading: false,
        blockSpotlightFailed: true,
      };
    },
    /* -----------------
    GET_BLOCKS_RECENT
    -------------------*/
    [`${GET_BLOCKS_RECENT}_${REQUEST}`](state) {
      return {
        ...state,
        blocksRecentLoading: true,
      };
    },
    [`${GET_BLOCKS_RECENT}_${SUCCESS}`](state, { payload }) {
      const { pages: blockPages, results: blocks } = payload;

      return {
        ...state,
        blocks,
        blockPages,
        blocksRecentLoading: false,
      };
    },
    [`${GET_BLOCKS_RECENT}_${FAILURE}`](state) {
      return {
        ...state,
        blocksRecentLoading: false,
      };
    },
    /* -----------------
    GET_BLOCKS_HEIGHT
    -------------------*/
    [`${GET_BLOCKS_HEIGHT}_${REQUEST}`](state) {
      return {
        ...state,
        blocksHeightLoading: true,
      };
    },
    [`${GET_BLOCKS_HEIGHT}_${SUCCESS}`](state, { payload }) {
      const { height: blocksHeight } = payload;

      return {
        ...state,
        blocksHeight,
        blocksHeightLoading: false,
      };
    },
    [`${GET_BLOCKS_HEIGHT}_${FAILURE}`](state) {
      return {
        ...state,
        blocksHeightLoading: false,
      };
    },
    /* -----------------
    GET_BLOCK_INFO
    -------------------*/
    [`${GET_BLOCK_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        blockInfoLoading: true,
      };
    },
    [`${GET_BLOCK_INFO}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        blockInfo: payload,
        blockInfoLoading: false,
      };
    },
    [`${GET_BLOCK_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        blockInfoLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
