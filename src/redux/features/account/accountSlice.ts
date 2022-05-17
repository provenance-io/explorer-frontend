import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from 'query-string';
import { RootState } from "redux/app/store";
import { ACCOUNT_INFO_URL } from "consts";
import { ajax } from "../api";

interface AccountInfo {
  accountAum?: {
    amount: string;
    denom: string;
  };
  accountName?: string;
  accountNumber?: number;
  accountType?: string;
  address?: string;
  attributes?: {
    attribute: string;
    data: string;
  }[];
  isContract?: boolean;
  publicKeys?: {
    pubKey: string;
    type: string;
  };
  sequence?: number;
  tokens?: {
    fungibleCount: number;
    nonFungibleCount: number;
  };
};

interface AccountAssets {
  pages: number;
  results: {
    amount: string;
    denom: string;
    pricePerToken: {
      amount: string;
      denom: string;
    };
    totalBalancePrice: {
      amount: string;
      denom: string;
    };
  }[],
  total: number;
  rollupTotals: {};
};

interface AccountDelegations {
  pages: number;
  results: {
    amount: {
      amount: string;
      denom: string;
    };
    block: number;
    delegatorAddr: string;
    endTime: string;
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string;
    validatorDstAddr: string;
    validatorSrcAddr: string;
  }[],
  total: number;
  rollupTotals: {
    bondedTotal: {
      amount: string;
      denom: string;
    };
  };
};

interface AccountRedelegations {
  records: {
    amount: {
      amount: string;
      denom: string;
    };
    block: number;
    delegatorAddr: string;
    endTime: string;
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string;
    validatorDstAddr: string;
    validatorSrcAddr: string;
  }[];
  rollupTotals: {
    redelegationTotal: {
      amount: string;
      denom: string;
    };
  };
};

interface AccountRewards {
  rewards: {
    reward: {
      amount: string;
      denom: string;
      pricePerToken: {
        amount: string;
        denom: string;
      };
      totalBalancePrice: {
        amount: string;
        denom: string;
      };
    }[];
    validatorAddress: string;
  }[];
  total: {
    amount: string;
    denom: string;
    pricePerToken: {
      amount: string;
      denom: string;
    };
    totalBalancePrice: {
      amount: string;
      denom: string;
    };
  }[];
};

interface AccountUnbonding {
  records: {
    amount: {
      amount: string;
      denom: string;
    };
    block: number;
    delegatorAddr: string;
    endTime: string;
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string;
    validatorDstAddr: string;
    validatorSrcAddr: string;
  }[];
  rollupTotals: {
    unbondingTotal: {
      amount: string;
      denom: string;
    };
  };
};

interface AccountState {
  // Account
  accountInfo: AccountInfo;
  accountInfoLoading: boolean;
  accountInfoFailure: boolean;
  // Account Assets
  accountAssetsLoading: boolean;
  accountAssets: AccountAssets["results"];
  accountAssetsPages: AccountAssets["pages"];
  accountAssetsTotal: AccountAssets["total"];
  // Account Delegations
  accountDelegationsLoading: boolean;
  accountDelegations: AccountDelegations["results"],
  accountDelegationsPages: AccountDelegations["pages"];
  accountDelegationsCount: AccountDelegations["total"];
  accountDelegationsTotal: AccountDelegations["rollupTotals"]["bondedTotal"];
  // Account Redelegations
  accountRedelegationsLoading: boolean;
  accountRedelegations: AccountRedelegations["records"],
  accountRedelegationsTotal: AccountRedelegations["rollupTotals"]["redelegationTotal"];
  // Account Rewards
  accountRewardsLoading: boolean;
  accountRewards: AccountRewards;
  // Account Unbonding
  accountUnbondingLoading: boolean;
  accountUnbonding: AccountUnbonding["records"],
  accountUnbondingTotal: AccountUnbonding["rollupTotals"]["unbondingTotal"];
}

const initialState: AccountState = {
  // Account
  accountInfo: {},
  accountInfoLoading: false,
  accountInfoFailure: false,
  // Account Assets
  accountAssetsLoading: false,
  accountAssets: [],
  accountAssetsPages: 0,
  accountAssetsTotal: 0,
  // Account Delegations
  accountDelegationsLoading: false,
  accountDelegations: [],
  accountDelegationsPages: 0,
  accountDelegationsCount: 0,
  accountDelegationsTotal: {
    amount: "",
    denom: "",
  },
  // Account Redelegations
  accountRedelegationsLoading: false,
  accountRedelegations: [],
  accountRedelegationsTotal: {
    amount: "",
    denom: "",
  },
  // Account Rewards
  accountRewardsLoading: false,
  accountRewards: { total: [], rewards: [] },
  // Account Unbonding
  accountUnbondingLoading: false,
  accountUnbonding: [],
  accountUnbondingTotal: {
    amount: "",
    denom: "",
  },
};

/* -----------------
** TYPES
-------------------*/
const GET_ACCOUNT_INFO = 'ACCOUNTS::GET_ACCOUNT_INFO';
const GET_ACCOUNT_ASSETS = 'ACCOUNTS::GET_ACCOUNT_ASSETS';
const GET_ACCOUNT_DELEGATIONS = 'ACCOUNTS::GET_ACCOUNT_DELEGATIONS';
const GET_ACCOUNT_REDELEGATIONS = 'ACCOUNTS::GET_ACCOUNT_REDELEGATIONS';
const GET_ACCOUNT_REWARDS = 'ACCOUNTS::GET_ACCOUNT_REWARDS';
const GET_ACCOUNT_UNBONDING = 'ACCOUNTS::GET_ACCOUNT_UNBONDING';

/* -----------------
** ACTIONS
-------------------*/
export const getAccountInfo = createAsyncThunk(
  GET_ACCOUNT_INFO,
  (address: string) => 
    ajax({
      url: `${ACCOUNT_INFO_URL}/${address}`,
    })
);

export const getAccountAssets = createAsyncThunk(
  GET_ACCOUNT_ASSETS,
  ({
    address,
    page = 1,
    count = 10,
  }: {
    address: string,
    page?: number,
    count?: number,
  }) => 
    ajax({
      url: `${ACCOUNT_INFO_URL}/${address}/balances?${qs.stringify({ page, count })}`,
    })
);

export const getAccountDelegations = createAsyncThunk(
  GET_ACCOUNT_DELEGATIONS,
  ({
    address,
    page = 1,
    count = 10,
  }: {
    address: string,
    page?: number,
    count?: number,
  }) => 
    ajax({
      url: `${ACCOUNT_INFO_URL}/${address}/delegations?${qs.stringify({ page, count })}`,
    })
);

export const getAccountRedelegations = createAsyncThunk(
  GET_ACCOUNT_REDELEGATIONS,
  (address: string) => 
    ajax({
      url: `${ACCOUNT_INFO_URL}/${address}/redelegations`,
    })
);

export const getAccountRewards = createAsyncThunk(
  GET_ACCOUNT_REWARDS,
  (address: string) => 
    ajax({
      url: `${ACCOUNT_INFO_URL}/${address}/rewards`,
    })
);

export const getAccountUnbonding = createAsyncThunk(
  GET_ACCOUNT_UNBONDING,
  (address: string) => 
    ajax({
      url: `${ACCOUNT_INFO_URL}/${address}/unbonding`,
    })
);

export const accountActions = {
  getAccountAssets,
  getAccountDelegations,
  getAccountInfo,
  getAccountRedelegations,
  getAccountRewards,
  getAccountUnbonding,
};

/* -----------------
** SLICE
-------------------*/
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
      GET_ACCOUNT_INFO
      -------------------*/
      .addCase(getAccountInfo.pending, (state) => {
        state.accountInfoLoading = true;
        state.accountInfoFailure = false;
      })
      .addCase(getAccountInfo.fulfilled, (state, { payload }) => {
        state.accountInfoLoading = false;
        state.accountInfo = payload.data;
        state.accountInfoFailure = false;
      })
      .addCase(getAccountInfo.rejected, (state) => {
        state.accountInfoLoading = false;
        state.accountInfoFailure = true;
      })
      /* -----------------
      GET_ACCOUNT_ASSETS
      -------------------*/
      .addCase(getAccountAssets.pending, (state) => {
        state.accountAssetsLoading = true;
      })
      .addCase(getAccountAssets.fulfilled, (state, { payload }) => {
        state.accountAssetsLoading = false;
        state.accountAssets = payload.data.results;
        state.accountAssetsPages = payload.data.pages;
        state.accountAssetsTotal = payload.data.total;
      })
      .addCase(getAccountAssets.rejected, (state) => {
        state.accountAssetsLoading = false;
      })
      /* -----------------
      GET_ACCOUNT_DELEGATIONS
      -------------------*/
      .addCase(getAccountDelegations.pending, (state) => {
        state.accountDelegationsLoading = true;
      })
      .addCase(getAccountDelegations.fulfilled, (state, { payload }) => {
        state.accountDelegationsLoading = false;
        state.accountDelegations = payload.data.results;
        state.accountDelegationsPages = payload.data.pages;
        state.accountDelegationsCount = payload.data.total;
        state.accountDelegationsTotal = payload.data.rollupTotals.bondedTotal;
      })
      .addCase(getAccountDelegations.rejected, (state) => {
        state.accountDelegationsLoading = false;
      })
      /* -----------------
      GET_ACCOUNT_REDELEGATIONS
      -------------------*/
      .addCase(getAccountRedelegations.pending, (state) => {
        state.accountRedelegationsLoading = true;
      })
      .addCase(getAccountRedelegations.fulfilled, (state, { payload }) => {
        state.accountRedelegationsLoading = false;
        state.accountRedelegations = payload.data.records;
        state.accountRedelegationsTotal = payload.data.rollupTotals.redelegationTotal;
      })
      .addCase(getAccountRedelegations.rejected, (state) => {
        state.accountRedelegationsLoading = false;
      })
      /* -----------------
      GET_ACCOUNT_REWARDS
      -------------------*/
      .addCase(getAccountRewards.pending, (state) => {
        state.accountRewardsLoading = true;
      })
      .addCase(getAccountRewards.fulfilled, (state, { payload }) => {
        state.accountRewardsLoading = false;
        state.accountRewards = payload.data;
      })
      .addCase(getAccountRewards.rejected, (state) => {
        state.accountRewardsLoading = false;
      })
      /* -----------------
      GET_ACCOUNT_UNBONDING
      -------------------*/
      .addCase(getAccountUnbonding.pending, (state) => {
        state.accountUnbondingLoading = true;
      })
      .addCase(getAccountUnbonding.fulfilled, (state, { payload }) => {
        state.accountUnbondingLoading = false;
        state.accountUnbonding = payload.data.records;
        state.accountUnbondingTotal = payload.data.rollupTotals.unbondingTotal;
      })
      .addCase(getAccountUnbonding.rejected, (state) => {
        state.accountUnbondingLoading = false;
      });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectAccount = (state: RootState) => state.account;

export default accountSlice.reducer;