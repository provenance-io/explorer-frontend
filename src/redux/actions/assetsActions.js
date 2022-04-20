import qs from 'query-string';
import { ASSET_DETAIL_URL, TX_INFO_URL, ASSETS_LIST_URL, ASSETS_DIST_URL } from 'consts';
import { ajaxGet } from './xhrActions';

export const GET_ASSET_INFO = 'GET_ASSET_INFO';
export const GET_ASSETS_LIST = 'GET_ASSETS_LIST';
export const GET_ASSET_ADMIN_TRANSACTIONS = 'GET_ASSET_ADMIN_TRANSACTIONS';
export const GET_ASSET_TRANSFER_TRANSACTIONS = 'GET_ASSET_TRANSFER_TRANSACTIONS';
export const GET_ASSET_HOLDERS = 'GET_ASSET_HOLDERS';
export const GET_ASSET_METADATA = 'GET_ASSET_METADATA';
export const GET_ASSETS_DIST = 'GET_ASSETS_DIST';

// API Calls
export const getAssetInfo = id => async dispatch =>
  ajaxGet(GET_ASSET_INFO, dispatch, `${ASSET_DETAIL_URL}/detail/${id}`);

export const getAssetsList =
  ({ page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(GET_ASSETS_LIST, dispatch, `${ASSETS_LIST_URL}?${qs.stringify({ page, count })}`);

export const getAssetHolders =
  ({ assetId, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_ASSET_HOLDERS,
      dispatch,
      `${ASSET_DETAIL_URL}/holders?${qs.stringify({ id: assetId, page, count })}`
    );

export const getAssetAdminTransactions =
  ({ denom, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_ASSET_ADMIN_TRANSACTIONS,
      dispatch,
      `${TX_INFO_URL}/module/ASSET?${qs.stringify({ denom, page, count })}`
    );

export const getAssetTransferTransactions =
  ({ denom, page = 1, count = 10 }) =>
  async dispatch =>
    ajaxGet(
      GET_ASSET_TRANSFER_TRANSACTIONS,
      dispatch,
      `${TX_INFO_URL}/module/TRANSFER?${qs.stringify({ denom, page, count })}`
    );

export const getAssetMetadata = () => async dispatch =>
  ajaxGet(GET_ASSET_METADATA, dispatch, `${ASSET_DETAIL_URL}/metadata`);

export const getAssetsDist = () => async dispatch =>
  ajaxGet(GET_ASSETS_DIST, dispatch, `${ASSETS_DIST_URL}`);
