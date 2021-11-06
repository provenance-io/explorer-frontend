import qs from 'query-string';
import { NFT_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Vars
// - Store
export const GET_NFT_DETAIL = 'NFT::GET_NFT_DETAIL';
export const GET_NFT_RECORDS = 'NFT::GET_NFT_RECORDS';
export const GET_NFT_BY_OWNER = 'NFT::GET_NFT_BY_OWNER';

// Actions
// - Store
export const getNftDetail = addr => dispatch =>
  ajaxGet(GET_NFT_DETAIL, dispatch, `${NFT_URL}/${addr}`);

export const getNftRecords = addr => dispatch =>
  ajaxGet(GET_NFT_RECORDS, dispatch, `${NFT_URL}/${addr}/records`);

export const getNftsByOwner =
  ({ addr, page = 1, count = 50 }) =>
  dispatch =>
    ajaxGet(
      GET_NFT_BY_OWNER,
      dispatch,
      `${NFT_URL}/owner/${addr}?${qs.stringify({ page, count })}`
    );
