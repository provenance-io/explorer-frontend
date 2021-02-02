import { ASSET_INFO_URL, ASSET_TRANSACTIONS_URL, ASSET_HOLDERS_URL } from 'consts';
import { ajaxGet } from './xhrActions';

export const GET_ASSET_INFO = 'GET_ASSET_INFO';
export const GET_ASSET_TRANSACTIONS = 'GET_ASSET_TRANSACTIONS';
export const GET_ASSET_HOLDERS = 'GET_ASSET_HOLDERS';

// API Calls
export const getAssetInfo = (assetId) => async (dispatch) => ajaxGet(GET_ASSET_INFO, dispatch, `${ASSET_INFO_URL}?id=${assetId}`);

export const getAssetTransactions = ({ asset, page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_ASSET_TRANSACTIONS, dispatch, `${ASSET_TRANSACTIONS_URL}?id=${asset}&count=${count}&page=${page}`);

export const getAssetHolders = ({ asset, page = 1, count = 10 }) => async (dispatch) =>
  ajaxGet(GET_ASSET_HOLDERS, dispatch, `${ASSET_HOLDERS_URL}?id=${asset}&count=${count}&page=${page}`);
