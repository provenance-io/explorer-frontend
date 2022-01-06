import { UPGRADE_INFO_URL } from 'consts'; // To-Do: add more URLs here once this is working
import { ajaxGet } from './xhrActions';

// Block
export const GET_UPGRADE_INFO = 'GET_UPGRADE_INFO';
// Add remaining API calls here once this is working

// API Calls
export const getUpgradeInfo = () => async dispatch =>
  ajaxGet(GET_UPGRADE_INFO, dispatch, `${UPGRADE_INFO_URL}`);
