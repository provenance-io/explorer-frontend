import { createAction } from 'redux-actions';
import { BLOCK_INFO_URL, BLOCKS_RECENT_URL, BLOCK_SPOTLIGHT_URL, BLOCK_CURRENT_HEIGHT_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Block
export const GET_BLOCK_INFO = 'GET_BLOCK_INFO';
export const GET_BLOCKS_CURRENT_HEIGHT = 'GET_BLOCKS_CURRENT_HEIGHT';
export const GET_BLOCKS_RECENT = 'GET_BLOCKS_RECENT';
export const GET_BLOCK_SPOTLIGHT = 'GET_BLOCK_SPOTLIGHT';
export const SET_RECENT_BLOCKS_COUNT = 'SET_RECENT_BLOCKS_COUNT';

// API Calls
export const getBlocksCurrentHeight = () => async (dispatch) => ajaxGet(GET_BLOCKS_CURRENT_HEIGHT, dispatch, BLOCK_CURRENT_HEIGHT_URL);
export const getBlocksRecent = ({ count = 10, page = 1 }) => async (dispatch) =>
  ajaxGet(GET_BLOCKS_RECENT, dispatch, `${BLOCKS_RECENT_URL}?count=${count}&page=${page}`);
export const getBlockInfo = (blockHeight) => async (dispatch) => ajaxGet(GET_BLOCK_INFO, dispatch, `${BLOCK_INFO_URL}/${blockHeight}`);
export const getBlockSpotlight = () => async (dispatch) => ajaxGet(GET_BLOCK_SPOTLIGHT, dispatch, BLOCK_SPOTLIGHT_URL);
// Store
export const setRecentBlocksCount = createAction(SET_RECENT_BLOCKS_COUNT);
