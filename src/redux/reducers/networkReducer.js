import { handleActions } from 'redux-actions';
import { Skips } from '../../consts';
import {
  GET_NETWORK_UPGRADES,
  GET_NETWORK_PARAMS,
  GET_NETWORK_TOKEN_STATS,
  GET_NETWORK_GAS_STATS,
  GET_NETWORK_GAS_VOLUME,
} from '../actions/networkActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Upgrade Info
  networkUpgrades: [],
  networkUpgradesLoading: false,
  // Params
  networkParams: [],
  networkParamsLoading: false,
  // Token Stats
  networkTokenStats: {},
  networkTokenStatsLoading: false,
  // Gas Statistics
  networkGasStats: [],
  networkGasStatsLoading: false,
  // Gas Volume
  networkGasVolume: [],
  networkGasVolumeLoading: false,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_NETWORK_UPGRADES
    -------------------*/
    [`${GET_NETWORK_UPGRADES}_${REQUEST}`](state) {
      return {
        ...state,
        networkUpgradesLoading: true,
      };
    },
    [`${GET_NETWORK_UPGRADES}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        networkUpgrades: payload.reverse().map(i => ({
          ...i,
          events:
            Skips[i.upgradeName] ||
            (i.scheduled
              ? `Not yet applied - will be applied at upgrade height ${i.upgradeHeight}`
              : ''),
        })),
        networkUpgradesLoading: false,
      };
    },
    [`${GET_NETWORK_UPGRADES}_${FAILURE}`](state) {
      return {
        ...state,
        networkUpgradesLoading: false,
      };
    },
    /* -----------------
    GET_NETWORK_PARAMS
    -------------------*/
    [`${GET_NETWORK_PARAMS}_${REQUEST}`](state) {
      return {
        ...state,
        networkParamsLoading: true,
      };
    },
    [`${GET_NETWORK_PARAMS}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        cosmosParams: payload.cosmos,
        provParams: payload.prov,
        networkParams: payload,
        networkParamsLoading: false,
      };
    },
    [`${GET_NETWORK_PARAMS}_${FAILURE}`](state) {
      return {
        ...state,
        networkParamsLoading: false,
      };
    },
    /* -----------------
    GET_NETWORK_TOKEN_STATS
    -------------------*/
    [`${GET_NETWORK_TOKEN_STATS}_${REQUEST}`](state) {
      return {
        ...state,
        networkTokenStatsLoading: true,
      };
    },
    [`${GET_NETWORK_TOKEN_STATS}_${SUCCESS}`](state, { payload: networkTokenStats }) {
      return {
        ...state,
        networkTokenStats,
        networkTokenStatsLoading: false,
      };
    },
    [`${GET_NETWORK_TOKEN_STATS}_${FAILURE}`](state) {
      return {
        ...state,
        networkTokenStatsLoading: false,
      };
    },
    /* -----------------
    GET_NETWORK_GAS_STATS
    -------------------*/
    [`${GET_NETWORK_GAS_STATS}_${REQUEST}`](state) {
      return {
        ...state,
        networkGasStatsLoading: true,
      };
    },
    [`${GET_NETWORK_GAS_STATS}_${SUCCESS}`](state, { payload: networkGasStats }) {
      return {
        ...state,
        networkGasStats,
        networkGasStatsLoading: false,
      };
    },
    [`${GET_NETWORK_GAS_STATS}_${FAILURE}`](state) {
      return {
        ...state,
        networkGasStatsLoading: false,
      };
    },
    /* -----------------
    GET_NETWORK_GAS_VOLUME
    -------------------*/
    [`${GET_NETWORK_GAS_VOLUME}_${REQUEST}`](state) {
      return {
        ...state,
        networkGasVolumeLoading: true,
      };
    },
    [`${GET_NETWORK_GAS_VOLUME}_${SUCCESS}`](state, { payload: networkGasVolume }) {
      return {
        ...state,
        networkGasVolume,
        networkGasVolumeLoading: false,
      };
    },
    [`${GET_NETWORK_GAS_VOLUME}_${FAILURE}`](state) {
      return {
        ...state,
        networkGasVolumeLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
