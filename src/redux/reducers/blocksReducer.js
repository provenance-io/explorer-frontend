import { handleActions } from 'redux-actions';
import {
  GET_BLOCK_INFO,
  GET_BLOCKS_RECENT,
  GET_BLOCK_SPOTLIGHT,
  SET_RECENT_BLOCKS_COUNT,
  GET_BLOCKS_CURRENT_HEIGHT,
} from '../actions/blocksActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Blocks
  blockInfo: {},
  blocks: [],
  blockLatest: {},
  blockPages: 0,
  avgBlockTime: 0,
  recentBlocksCount: 10,
  currentHeight: '',
  // Loading states
  blockSpotlightLoading: false,
  blocksRecentLoading: false,
  blocksCurrentHeightLoading: false,
  blockInfoLoading: false,
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
      };
    },
    [`${GET_BLOCK_SPOTLIGHT}_${SUCCESS}`](state, { payload }) {
      const { latestBlock: blockLatest, avgBlockTime, bondedTokenPercent, bondedTokenAmount, bondedTokenTotal } = payload;

      return {
        ...state,
        blockLatest: {
          ...blockLatest,
          bondedTokenPercent,
          bondedTokenAmount,
          bondedTokenTotal,
        },
        blockHeight: blockLatest.height,
        avgBlockTime,
        blockSpotlightLoading: false,
      };
    },
    [`${GET_BLOCK_SPOTLIGHT}_${FAILURE}`](state) {
      return {
        ...state,
        blockSpotlightLoading: false,
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
    GET_BLOCKS_CURRENT_HEIGHT
    -------------------*/
    [`${GET_BLOCKS_CURRENT_HEIGHT}_${REQUEST}`](state) {
      return {
        ...state,
        blocksCurrentHeightLoading: true,
      };
    },
    [`${GET_BLOCKS_CURRENT_HEIGHT}_${SUCCESS}`](state, { payload: currentHeight }) {
      return {
        ...state,
        currentHeight,
        blocksCurrentHeightLoading: false,
      };
    },
    [`${GET_BLOCKS_CURRENT_HEIGHT}_${FAILURE}`](state) {
      return {
        ...state,
        blocksCurrentHeightLoading: false,
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
