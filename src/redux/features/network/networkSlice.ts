import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/store';
import {
  NETWORK_UPGRADES_URL,
  NETWORK_PARAMS_URL,
  NETWORK_GAS_STATS_URL,
  NETWORK_GAS_VOL_URL,
  NETWORK_TOKEN_STATS_URL,
  Skips,
  NETWORK_TOTAL_SUPPLY_URL,
} from '../../../consts';
import { ajax } from '../api';

interface NetworkUpgrades {
  currentVersion: string;
  initialVersion: string;
  releaseUrl: string;
  scheduled: boolean;
  skipped: boolean;
  upgradeHeight: number;
  upgradeName: string;
}

interface NetworkParams {
  cosmos?: {
    auth?: {
      max_memo_characters: string;
      tx_sig_limit: string;
      tx_size_cost_per_byte: string;
      sig_verify_cost_ed25519: string;
      sig_verify_cost_secp256k1: string;
    };
    bank?: {
      default_send_enabled: boolean;
    };
    dist?: {
      base_proposer_reward: string;
      bonus_proposer_reward: string;
      community_tax: string;
      withdraw_addr_enabled: boolean;
    };
    gov?: {
      deposit: {
        min_deposit: {
          denom: string;
          amount: string;
        }[];
        max_deposit_period: string;
      };
      tallying: {
        quorum: string;
        threshold: string;
        veto_threshold: string;
      };
      voting: {
        voting_period: string;
      };
    };
    ibc?: {
      client: {
        allowed_clients: string[];
      };
      transfer: {
        send_enabled: boolean;
        receive_enabled: boolean;
      };
    };
    mint?: {
      blocks_per_year: number;
      goal_bonded: string;
      inflation_max: string;
      inflation_min: string;
      inflation_rate_change: string;
      mint_denom: string;
    };
    slashing?: {
      downtime_jail_duration: string;
      min_signed_per_window: string;
      signed_blocks_window: number;
      slash_fraction_double_sign: string;
      slash_fraction_downtime: string;
    };
    staking?: {
      unbonding_time: string;
      max_validators: number;
      max_entries: number;
      historical_entries: number;
      bond_denom: string;
    };
  };
  prov?: {
    attribute?: {
      max_value_length: number;
    };
    marker?: {
      max_total_supply: string;
      enable_governance: boolean;
      unrestricted_denom_regex: string;
    };
    metadata?: {};
    msgFees?: {
      floor_gas_price: {
        denom: string;
        amount: string;
      };
    };
    name?: {
      max_segment_length: number;
      min_segment_length: number;
      max_name_levels: number;
      allow_unrestricted_names: boolean;
    };
  };
}

export interface NetworkTokenStats {
  bonded: {
    amount: string;
    denom: string;
  };
  burned: {
    amount: string;
    denom: string;
  };
  circulation: {
    amount: string;
    denom: string;
  };
  communityPool: {
    amount: string;
    denom: string;
  };
  currentSupply: {
    amount: string;
    denom: string;
  };
  maxSupply: {
    amount: string;
    denom: string;
  };
}

interface NetworkGasStats {
  avgGasUsed: number;
  date: string;
  maxGasUsed: number;
  messageType: string;
  minGasUsed: number;
  stdDevGasUsed: number;
}

export interface NetworkVolumeStats {
  date: string;
  feeAmount: number;
  gasUsed: number;
  gasWanted: number;
}

interface NetworkState {
  // Upgrade Info
  networkUpgrades: NetworkUpgrades[];
  networkUpgradesLoading: boolean;
  // Params
  networkParams: NetworkParams;
  cosmosParams: NetworkParams['cosmos'];
  provParams: NetworkParams['prov'];
  networkParamsLoading: boolean;
  // Token Stats
  networkTokenStats: NetworkTokenStats;
  networkTokenStatsLoading: boolean;
  // Gas Statistics
  networkGasStats: NetworkGasStats[];
  networkGasStatsLoading: boolean;
  // Gas Volume
  networkGasVolume: NetworkVolumeStats[];
  networkGasVolumeLoading: boolean;
  // Total Supply
  networkTotalSupply: number;
  networkTotalSupplyLoading: boolean;
}

export const initialState: NetworkState = {
  // Upgrade Info
  networkUpgrades: [],
  networkUpgradesLoading: false,
  // Params
  networkParams: {},
  cosmosParams: {},
  provParams: {},
  networkParamsLoading: false,
  // Token Stats
  networkTokenStats: {
    bonded: {
      amount: '',
      denom: '',
    },
    burned: {
      amount: '',
      denom: '',
    },
    circulation: {
      amount: '',
      denom: '',
    },
    communityPool: {
      amount: '',
      denom: '',
    },
    currentSupply: {
      amount: '',
      denom: '',
    },
    maxSupply: {
      amount: '',
      denom: '',
    },
  },
  networkTokenStatsLoading: false,
  // Gas Statistics
  networkGasStats: [],
  networkGasStatsLoading: false,
  // Gas Volume
  networkGasVolume: [],
  networkGasVolumeLoading: false,
  // Total Supply
  networkTotalSupply: 0,
  networkTotalSupplyLoading: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_NETWORK_UPGRADES = 'GET_NETWORK_UPGRADES';
export const GET_NETWORK_PARAMS = 'GET_NETWORK_PARAMS';
export const GET_NETWORK_TOKEN_STATS = 'GET_TOKEN_STATS';
export const GET_NETWORK_GAS_STATS = 'GET_NETWORK_GAS_STATS';
export const GET_NETWORK_GAS_VOLUME = 'GET_NETWORK_GAS_VOLUME';
export const GET_NETWORK_TOTAL_SUPPLY = 'GET_NETWORK_TOTAL_SUPPLY';

/* -----------------
** ACTIONS
-------------------*/
export const getNetworkUpgrades = createAsyncThunk(GET_NETWORK_UPGRADES, () =>
  ajax({
    url: NETWORK_UPGRADES_URL,
  })
);

export const getNetworkParams = createAsyncThunk(GET_NETWORK_PARAMS, () =>
  ajax({
    url: NETWORK_PARAMS_URL,
  })
);

export const getNetworkTokenStats = createAsyncThunk(GET_NETWORK_TOKEN_STATS, () =>
  ajax({
    url: NETWORK_TOKEN_STATS_URL,
  })
);

export const getNetworkGasStats = createAsyncThunk(
  GET_NETWORK_GAS_STATS,
  ({
    toDate,
    fromDate,
    granularity = 'day',
  }: {
    toDate: string;
    fromDate: string;
    granularity: string;
  }) =>
    ajax({
      url: `${NETWORK_GAS_STATS_URL}?fromDate=${fromDate}&toDate=${toDate}&granularity=${granularity.toUpperCase()}`,
    })
);

export const getNetworkGasVolume = createAsyncThunk(
  GET_NETWORK_GAS_VOLUME,
  ({
    toDate,
    fromDate,
    granularity = 'day',
  }: {
    toDate: string;
    fromDate: string;
    granularity: string;
  }) =>
    ajax({
      url: `${NETWORK_GAS_VOL_URL}?fromDate=${fromDate}&toDate=${toDate}&granularity=${granularity.toUpperCase()}`,
    })
);

export const getNetworkTotalSupply = createAsyncThunk(GET_NETWORK_TOTAL_SUPPLY, () =>
  ajax({
    url: NETWORK_TOTAL_SUPPLY_URL,
  })
);

export const networkActions = {
  getNetworkUpgrades,
  getNetworkParams,
  getNetworkTokenStats,
  getNetworkGasStats,
  getNetworkGasVolume,
  getNetworkTotalSupply,
};
/* -----------------
** SLICE
-------------------*/
export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
    GET_NETWORK_UPGRADES
    -------------------*/
      .addCase(getNetworkUpgrades.pending, (state) => {
        state.networkUpgradesLoading = true;
      })
      .addCase(getNetworkUpgrades.fulfilled, (state, { payload }) => {
        state.networkUpgradesLoading = false;
        state.networkUpgrades = payload.data.reverse().map((i: NetworkUpgrades) => ({
          ...i,
          events:
            Skips[i.upgradeName] ||
            (i.scheduled
              ? `Not yet applied - will be applied at upgrade height ${i.upgradeHeight}`
              : ''),
        }));
      })
      .addCase(getNetworkUpgrades.rejected, (state) => {
        state.networkUpgradesLoading = false;
      })
      /* -----------------
    GET_NETWORK_PARAMS
    -------------------*/
      .addCase(getNetworkParams.pending, (state) => {
        state.networkParamsLoading = true;
      })
      .addCase(getNetworkParams.fulfilled, (state, { payload }) => {
        state.networkParamsLoading = false;
        state.cosmosParams = payload.data.cosmos;
        state.provParams = payload.data.prov;
        state.networkParams = payload.data;
      })
      .addCase(getNetworkParams.rejected, (state) => {
        state.networkParamsLoading = false;
      })
      /* -----------------
    GET_NETWORK_TOKEN_STATS
    -------------------*/
      .addCase(getNetworkTokenStats.pending, (state) => {
        state.networkTokenStatsLoading = true;
      })
      .addCase(getNetworkTokenStats.fulfilled, (state, { payload }) => {
        state.networkTokenStatsLoading = false;
        state.networkTokenStats = payload.data;
      })
      .addCase(getNetworkTokenStats.rejected, (state) => {
        state.networkTokenStatsLoading = false;
      })
      /* -----------------
    GET_NETWORK_GAS_STATS
    -------------------*/
      .addCase(getNetworkGasStats.pending, (state) => {
        state.networkGasStatsLoading = true;
      })
      .addCase(getNetworkGasStats.fulfilled, (state, { payload }) => {
        state.networkGasStatsLoading = false;
        state.networkGasStats = payload.data;
      })
      .addCase(getNetworkGasStats.rejected, (state) => {
        state.networkGasStatsLoading = false;
      })
      /* -----------------
    GET_NETWORK_GAS_VOLUME
    -------------------*/
      .addCase(getNetworkGasVolume.pending, (state) => {
        state.networkGasVolumeLoading = true;
      })
      .addCase(getNetworkGasVolume.fulfilled, (state, { payload }) => {
        state.networkGasVolumeLoading = false;
        state.networkGasVolume = payload.data;
      })
      .addCase(getNetworkGasVolume.rejected, (state) => {
        state.networkGasVolumeLoading = false;
      })
      /* -----------------
    GET_NETWORK_TOTAL_SUPPLY
    -------------------*/
      .addCase(getNetworkTotalSupply.pending, (state) => {
        state.networkTotalSupplyLoading = true;
      })
      .addCase(getNetworkTotalSupply.fulfilled, (state, { payload }) => {
        state.networkTotalSupplyLoading = false;
        state.networkTotalSupply = payload.data;
      })
      .addCase(getNetworkTotalSupply.rejected, (state) => {
        state.networkTotalSupplyLoading = false;
      });
  },
});
/* -----------------
SELECTORS
-------------------*/
export const selectNetwork = (state: RootState) => state.network;

export default networkSlice.reducer;
