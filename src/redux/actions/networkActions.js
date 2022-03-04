import {
  NETWORK_UPGRADES_URL,
  NETWORK_PARAMS_URL,
  NETWORK_GAS_STATS_URL,
  NETWORK_GAS_VOL_URL,
  NETWORK_TOKEN_STATS_URL,
} from 'consts';
import { ajaxGet } from './xhrActions';

// Block
export const GET_NETWORK_UPGRADES = 'GET_NETWORK_UPGRADES';
export const GET_NETWORK_PARAMS = 'GET_NETWORK_PARAMS';
export const GET_NETWORK_TOKEN_STATS = 'GET_TOKEN_STATS';
export const GET_NETWORK_GAS_STATS = 'GET_NETWORK_GAS_STATS';
export const GET_NETWORK_GAS_VOLUME = 'GET_NETWORK_GAS_VOLUME';

// API Calls
export const getNetworkUpgrades = () => async dispatch =>
  ajaxGet(GET_NETWORK_UPGRADES, dispatch, `${NETWORK_UPGRADES_URL}`);

export const getNetworkParams = () => async dispatch =>
  ajaxGet(GET_NETWORK_PARAMS, dispatch, `${NETWORK_PARAMS_URL}`);

export const getNetworkTokenStats = () => async dispatch =>
  ajaxGet(GET_NETWORK_TOKEN_STATS, dispatch, `${NETWORK_TOKEN_STATS_URL}`);

export const getNetworkGasStats =
  ({ toDate, fromDate, granularity = 'day' }) =>
  async dispatch =>
    ajaxGet(
      GET_NETWORK_GAS_STATS,
      dispatch,
      `${NETWORK_GAS_STATS_URL}?fromDate=${fromDate}&toDate=${toDate}&granularity=${granularity.toUpperCase()}`
    );

export const getNetworkGasVolume =
  ({ toDate, fromDate, granularity = 'day' }) =>
  async dispatch =>
    ajaxGet(
      GET_NETWORK_GAS_VOLUME,
      dispatch,
      `${NETWORK_GAS_VOL_URL}?fromDate=${fromDate}&toDate=${toDate}&granularity=${granularity.toUpperCase()}`
    );
