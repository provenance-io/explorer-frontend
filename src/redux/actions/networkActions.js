import { NETWORK_UPGRADES_URL, NETWORK_PARAMS_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Block
export const GET_NETWORK_UPGRADES = 'GET_NETWORK_UPGRADES';
export const GET_NETWORK_PARAMS = 'GET_NETWORK_PARAMS';
// Add remaining API calls here once this is working

// API Calls
export const getNetworkUpgrades = () => async dispatch =>
  ajaxGet(GET_NETWORK_UPGRADES, dispatch, `${NETWORK_UPGRADES_URL}`);

export const getNetworkParams = () => async dispatch =>
  ajaxGet(GET_NETWORK_PARAMS, dispatch, `${NETWORK_PARAMS_URL}`);
