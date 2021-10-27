import { NFT_URL, NFT_SCOPE_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Vars
// - Store
export const GET_NFT_DETAIL = 'NFT::GET_NFT_DETAIL';
export const GET_NFT_RECORDS = 'NFT::GET_NFT_RECORDS';
export const GET_NFT_BY_OWNER = 'NFT::GET_NFT_BY_OWNER';
export const GET_NFT_ADDRESS = 'NFT::GET_NFT_ADDRESS';

// Actions
// - Store
export const getNftDetail = addr => dispatch =>
  ajaxGet(GET_NFT_DETAIL, dispatch, `${NFT_SCOPE_URL}/${addr}`);

export const getNftRecords = addr => dispatch =>
  ajaxGet(GET_NFT_RECORDS, dispatch, `${NFT_SCOPE_URL}/${addr}/records`);

export const getNftsByOwner = addr => dispatch =>
  ajaxGet(GET_NFT_BY_OWNER, dispatch, `${NFT_SCOPE_URL}/owner/${addr}`);

export const getNftAddress = addr => dispatch =>
  ajaxGet(GET_NFT_ADDRESS, dispatch, `${NFT_URL}/address/${addr}`);
