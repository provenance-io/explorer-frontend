import { handleActions } from 'redux-actions';
import { Skips } from '../../consts';
import {
  GET_NETWORK_UPGRADES,
  GET_NETWORK_PARAMS,
  GET_NETWORK_TOKEN_STATS,
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
  },
  initialState
);

export default reducer;
