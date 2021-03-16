import { ASSET_DETAIL_URL, TX_INFO_URL, ASSETS_LIST_URL } from 'consts';
import { ajaxGet } from './xhrActions';

export const GET_ASSET_INFO = 'GET_ASSET_INFO';
export const GET_ASSETS_LIST = 'GET_ASSETS_LIST';
export const GET_ASSET_TRANSACTIONS = 'GET_ASSET_TRANSACTIONS';
export const GET_ASSET_HOLDERS = 'GET_ASSET_HOLDERS';

// API Calls
export const getAssetInfo = (id) => async (dispatch) => ajaxGet(GET_ASSET_INFO, dispatch, `${ASSET_DETAIL_URL}/${id}/detail`);
export const getAssetsList = () => async (dispatch) => ajaxGet(GET_ASSETS_LIST, dispatch, `${ASSETS_LIST_URL}`);
export const getAssetHolders = (id) => async (dispatch) => ajaxGet(GET_ASSET_HOLDERS, dispatch, `${ASSET_DETAIL_URL}/${id}/holders`);
export const getAssetTransactions = ({ denom, page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_ASSET_TRANSACTIONS, dispatch, `${TX_INFO_URL}/module/ASSET?denom=${denom}&page=${page}&count=${count}`);
