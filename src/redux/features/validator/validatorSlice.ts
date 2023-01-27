import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  VALIDATOR_INFO_URL,
  VALIDATORS_RECENT_URL,
  VALIDATORS_GET_ALL_URL,
  BLOCK_VALIDATORS_URL,
  TX_INFO_URL,
} from '../../../consts';
import { ajax } from '../api';
import { TransactionsModule } from '../asset/assetSlice';

interface AllValidators {
  pages: number;
  results: {
    addressId: string;
    commission: string;
    imgUrl: string;
    moniker: string;
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

export interface ValidatorsRecent {
  pages: number;
  results: {
    addressId: string;
    bondedTokens: {
      count: string;
      denom: string;
      total: string;
    };
    commission: string;
    consensusAddress: string;
    delegators: number;
    hr24Change: string;
    imgUrl: string;
    moniker: string;
    proposerPriority: number;
    status: string;
    unbondingHeight: number;
    uptime: number;
    votingPower: {
      count: number;
      total: number;
    };
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

export interface ValidatorSpotlight {
  blockCount: {
    count: number;
    total: number;
  };
  bondHeight: number;
  consensusPubKey: string;
  description: string;
  identity: string;
  imgUrl: string;
  jailedUntil: string;
  moniker: string;
  operatorAddress: string;
  ownerAddress: string;
  removed: boolean;
  siteUrl: string;
  status: string;
  unbondingHeight: number;
  uptime: number;
  votingPower: {
    count: number;
    total: number;
  };
  withdrawalAddress: string;
}

interface TopValidators extends ValidatorsRecent {}

interface BlockValidators {
  pages: number;
  results: {
    addressId: string;
    consensusAddress: string;
    didVote: boolean;
    imgUrl: string;
    isProposer: boolean;
    moniker: string;
    proposerPriority: number;
    votingPower: {
      count: number;
      total: number;
    };
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

export interface ValidatorDelegations {
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
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

interface ValidatorCommission {
  bondedTokens: {
    count: string;
    denom: string;
    total: string;
  };
  commissionRate: {
    maxChangeRate: string;
    maxRate: string;
    rate: string;
  };
  commissionRewards: {
    amount: string;
    denom: string;
  };
  delegatorBonded: {
    count: string;
    denom: string;
    total: string;
  };
  delegatorCount: number;
  selfBonded: {
    count: string;
    denom: string;
    total: string;
  };
  totalShares: string;
}

interface ValidatorUnbondingDelegations {
  records: {
    delegatorAddr: string;
    validatorSrcAddr: string;
    validatorDstAddr: string | null;
    amount: {
      amount: string;
      denom: string;
    };
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string | null;
    block: number;
    endTime: number;
  }[];
  rollupTotals: {
    unbondingTotal: {
      amount: string;
      denom: string;
    };
  };
}

interface ValidatorDelegationTxs extends TransactionsModule {}
interface ValidatorTxs extends TransactionsModule {}

export interface ValidatorState {
  // All validators
  allValidators: AllValidators['results'];
  allValidatorsPages: AllValidators['pages'];
  allValidatorsLoading: boolean;
  // Validators Recent
  validators: ValidatorsRecent['results'];
  validatorsPages: ValidatorsRecent['pages'];
  validatorsTotal: ValidatorsRecent['total'];
  validatorsRecentLoading: boolean;
  // Validator Spotlight
  validatorSpotlight: ValidatorSpotlight;
  validatorSpotlightLoading: boolean;
  // Top Validators
  topValidators: TopValidators['results'];
  topValidatorsLoading: boolean;
  // Block Validators
  blockValidators: BlockValidators['results'];
  blockValidatorsLoading: boolean;
  blockValidatorsPages: BlockValidators['pages'];
  // Validator Delegations
  validatorDelegations: ValidatorDelegations['results'];
  validatorDelegationsLoading: boolean;
  validatorDelegationsPages: ValidatorDelegations['pages'];
  // Validator Unbonding Delegations
  validatorUnbondingDelegations: ValidatorUnbondingDelegations['records'];
  validatorUnbondingDelegationsLoading: boolean;
  validatorUnbondingDelegationsTotal: ValidatorUnbondingDelegations['rollupTotals']['unbondingTotal'];
  // Validator Delegation Txs
  validatorDelegationTxs: ValidatorDelegationTxs['results'];
  validatorDelegationTxsLoading: boolean;
  validatorDelegationTxsPages: ValidatorDelegationTxs['pages'];
  // Validator Txs
  validatorTxs: ValidatorTxs['results'];
  validatorTxsLoading: boolean;
  validatorTxsPages: ValidatorTxs['pages'];
  // Validator Commission Info
  validatorCommission: ValidatorCommission;
  validatorCommissionLoading: boolean;
}

export const initialState: ValidatorState = {
  // All validators
  allValidators: [],
  allValidatorsPages: 0,
  allValidatorsLoading: false,
  // Validators Recent
  validators: [],
  validatorsPages: 0,
  validatorsTotal: 0,
  validatorsRecentLoading: false,
  // Validator Spotlight
  validatorSpotlight: {
    blockCount: {
      count: 0,
      total: 0,
    },
    bondHeight: 0,
    consensusPubKey: '',
    description: '',
    identity: '',
    imgUrl: '',
    jailedUntil: '',
    moniker: '',
    operatorAddress: '',
    ownerAddress: '',
    removed: false,
    siteUrl: '',
    status: '',
    unbondingHeight: 0,
    uptime: 0,
    votingPower: {
      count: 0,
      total: 0,
    },
    withdrawalAddress: '',
  },
  validatorSpotlightLoading: false,
  // Top Validators
  topValidators: [],
  topValidatorsLoading: false,
  // Block Validators
  blockValidators: [],
  blockValidatorsLoading: false,
  blockValidatorsPages: 0,
  // Validator Delegations
  validatorDelegations: [],
  validatorDelegationsLoading: false,
  validatorDelegationsPages: 1,
  // Validator Unbonding Delegations
  validatorUnbondingDelegations: [],
  validatorUnbondingDelegationsLoading: false,
  validatorUnbondingDelegationsTotal: {
    amount: '',
    denom: '',
  },
  // Validator Delegation Txs
  validatorDelegationTxs: [],
  validatorDelegationTxsLoading: false,
  validatorDelegationTxsPages: 1,
  // Validator Txs
  validatorTxs: [],
  validatorTxsLoading: false,
  validatorTxsPages: 1,
  // Validator Commission Info
  validatorCommission: {
    bondedTokens: {
      count: '',
      denom: '',
      total: '',
    },
    commissionRate: {
      maxChangeRate: '',
      maxRate: '',
      rate: '',
    },
    commissionRewards: {
      amount: '',
      denom: '',
    },
    delegatorBonded: {
      count: '',
      denom: '',
      total: '',
    },
    delegatorCount: 0,
    selfBonded: {
      count: '',
      denom: '',
      total: '',
    },
    totalShares: '',
  },
  validatorCommissionLoading: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_TOP_VALIDATORS = 'GET_TOP_VALIDATORS';
export const GET_ALL_VALIDATORS = 'GET_ALL_VALIDATORS';
export const GET_BLOCK_VALIDATORS = 'GET_BLOCK_VALIDATORS';
export const GET_VALIDATOR_SPOTLIGHT = 'GET_VALIDATOR_SPOTLIGHT';
export const GET_VALIDATORS_RECENT = 'GET_VALIDATORS_RECENT';
export const GET_VALIDATOR_COMMISSION = 'GET_VALIDATOR_COMMISSION';
export const GET_VALIDATOR_DELEGATIONS = 'GET_VALIDATOR_DELEGATIONS';
export const GET_VALIDATOR_UNBONDING_DELEGATIONS = 'GET_VALIDATOR_UNBONDING_DELEGATIONS';
export const GET_VALIDATOR_DELEGATION_TXS = 'GET_VALIDATOR_DELEGATION_TXS';
export const GET_VALIDATOR_TXS = 'GET_VALIDATOR_TXS';

/* -----------------
** ACTIONS
-------------------*/
export const getBlockValidators = createAsyncThunk(
  GET_BLOCK_VALIDATORS,
  ({
    blockHeight,
    page = 1,
    count = 10,
    sort = 'desc',
  }: {
    blockHeight: number;
    page: number;
    count: number;
    sort: string;
  }) =>
    ajax({
      url: `${BLOCK_VALIDATORS_URL}/${blockHeight}?page=${page}&count=${count}&sort=${sort}`,
    })
);

export const getValidatorsRecent = createAsyncThunk(
  GET_VALIDATORS_RECENT,
  ({ page = 1, count = 10, status = 'active' }: { page: number; count: number; status: string }) =>
    ajax({
      url: `${VALIDATORS_RECENT_URL}?page=${page}&count=${count}&status=${status}`,
    })
);

export const getAllValidators = createAsyncThunk(
  GET_ALL_VALIDATORS,
  ({ page = 1, count = 100, status = 'all' }: { page?: number; count?: number; status?: string }) =>
    ajax({
      url: `${VALIDATORS_GET_ALL_URL}?page=${page}&count=${count}&status=${status}`,
    })
);

export const getTopValidators = createAsyncThunk(
  GET_TOP_VALIDATORS,
  ({ page = 1, count = 10, sort = 'desc' }: { page: number; count: number; sort: string }) =>
    ajax({
      url: `${VALIDATORS_RECENT_URL}?sort=${sort}&page=${page}&count=${count}`,
    })
);

export const getValidatorSpotlight = createAsyncThunk(GET_VALIDATOR_SPOTLIGHT, (id: string) =>
  ajax({
    url: `${VALIDATOR_INFO_URL}/${id}`,
  })
);

export const getValidatorCommission = createAsyncThunk(GET_VALIDATOR_COMMISSION, (id: string) =>
  ajax({
    url: `${VALIDATOR_INFO_URL}/${id}/commission`,
  })
);

export const getValidatorDelegations = createAsyncThunk(
  GET_VALIDATOR_DELEGATIONS,
  ({ id, page = 1, count = 10 }: { id: string; page: number; count: number }) =>
    ajax({
      url: `${VALIDATOR_INFO_URL}/${id}/delegations/bonded?count=${count}&page=${page}`,
    })
);

export const getValidatorUnbondingDelegations = createAsyncThunk(
  GET_VALIDATOR_UNBONDING_DELEGATIONS,
  ({ id, page = 1, count = 10 }: { id: string; page: number; count: number }) =>
    ajax({
      url: `${VALIDATOR_INFO_URL}/${id}/delegations/unbonding?count=${count}&page=${page}`,
    })
);

export const getValidatorDelegationTxs = createAsyncThunk(
  GET_VALIDATOR_DELEGATION_TXS,
  ({ id, page = 1, count = 10 }: { id: string; page: number; count: number }) =>
    ajax({
      url: `${TX_INFO_URL}/module/DELEGATION?address=${id}&page=${page}&count=${count}`,
    })
);

export const getValidatorTxs = createAsyncThunk(
  GET_VALIDATOR_TXS,
  ({ id, page = 1, count = 10 }: { id: string; page: number; count: number }) =>
    ajax({
      url: `${TX_INFO_URL}/module/VALIDATION?address=${id}&page=${page}&count=${count}`,
    })
);

export const validatorActions = {
  getBlockValidators,
  getValidatorsRecent,
  getAllValidators,
  getTopValidators,
  getValidatorSpotlight,
  getValidatorCommission,
  getValidatorDelegations,
  getValidatorUnbondingDelegations,
  getValidatorDelegationTxs,
  getValidatorTxs,
};
/* -----------------
** SLICE
-------------------*/
export const validatorSlice = createSlice({
  name: 'validator',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
    GET_ALL_VALIDATOR
    -------------------*/
      .addCase(getAllValidators.pending, (state) => {
        state.allValidatorsLoading = true;
      })
      .addCase(getAllValidators.fulfilled, (state, { payload }) => {
        state.allValidatorsLoading = false;
        state.allValidators = payload.data.results;
        state.allValidatorsPages = payload.data.pages;
      })
      .addCase(getAllValidators.rejected, (state) => {
        state.allValidatorsLoading = false;
      })
      /* -----------------
    GET_VALIDATOR_TXS
    -------------------*/
      .addCase(getValidatorTxs.pending, (state) => {
        state.validatorTxsLoading = true;
      })
      .addCase(getValidatorTxs.fulfilled, (state, { payload }) => {
        state.validatorTxsLoading = false;
        state.validatorTxs = payload.data.results;
        state.validatorTxsPages = payload.data.pages;
      })
      .addCase(getValidatorTxs.rejected, (state) => {
        state.validatorTxsLoading = false;
      })
      /* -----------------
    GET_VALIDATOR_DELEGATION_TXS
    -------------------*/
      .addCase(getValidatorDelegationTxs.pending, (state) => {
        state.validatorDelegationTxsLoading = true;
      })
      .addCase(getValidatorDelegationTxs.fulfilled, (state, { payload }) => {
        state.validatorDelegationTxsLoading = false;
        state.validatorDelegationTxs = payload.data.results;
        state.validatorDelegationTxsPages = payload.data.pages;
      })
      .addCase(getValidatorDelegationTxs.rejected, (state) => {
        state.validatorDelegationTxsLoading = false;
      })
      /* -----------------
    GET_VALIDATOR_UNBONDING_DELEGATIONS
    -------------------*/
      .addCase(getValidatorUnbondingDelegations.pending, (state) => {
        state.validatorUnbondingDelegationsLoading = true;
      })
      .addCase(getValidatorUnbondingDelegations.fulfilled, (state, { payload }) => {
        // TODO: Change this when pagination is supported
        state.validatorUnbondingDelegationsLoading = false;
        state.validatorUnbondingDelegations = payload.data.records;
        state.validatorUnbondingDelegationsTotal = payload.data.rollupTotals.unbondingTotal;
      })
      .addCase(getValidatorUnbondingDelegations.rejected, (state) => {
        state.validatorUnbondingDelegationsLoading = false;
      })
      /* -----------------
    GET_VALIDATOR_DELEGATIONS
    -------------------*/
      .addCase(getValidatorDelegations.pending, (state) => {
        state.validatorDelegationsLoading = true;
      })
      .addCase(getValidatorDelegations.fulfilled, (state, { payload }) => {
        state.validatorDelegationsLoading = false;
        state.validatorDelegations = payload.data.results;
        state.validatorDelegationsPages = payload.data.pages;
      })
      .addCase(getValidatorDelegations.rejected, (state) => {
        state.validatorDelegationsLoading = false;
      })
      /* -----------------
    GET_VALIDATOR_COMMISSION
    -------------------*/
      .addCase(getValidatorCommission.pending, (state) => {
        state.validatorCommissionLoading = true;
      })
      .addCase(getValidatorCommission.fulfilled, (state, { payload }) => {
        state.validatorCommissionLoading = false;
        state.validatorCommission = payload.data;
      })
      .addCase(getValidatorCommission.rejected, (state) => {
        state.validatorCommissionLoading = false;
      })
      /* -----------------
    GET_TOP_VALIDATORS
    -------------------*/
      .addCase(getTopValidators.pending, (state) => {
        state.topValidators = [];
        state.topValidatorsLoading = true;
      })
      .addCase(getTopValidators.fulfilled, (state, { payload }) => {
        state.topValidators = payload.data.results || [];
        state.topValidatorsLoading = false;
      })
      .addCase(getTopValidators.rejected, (state) => {
        state.topValidatorsLoading = false;
      })
      /* -----------------
    GET_VALIDATOR_INFO
    -------------------*/
      .addCase(getValidatorSpotlight.pending, (state) => {
        state.validatorSpotlightLoading = true;
      })
      .addCase(getValidatorSpotlight.fulfilled, (state, { payload }) => {
        state.validatorSpotlightLoading = false;
        state.validatorSpotlight = payload.data;
      })
      .addCase(getValidatorSpotlight.rejected, (state) => {
        state.validatorSpotlightLoading = false;
      })
      /* -----------------
    GET_VALIDATORS_RECENT
    -------------------*/
      .addCase(getValidatorsRecent.pending, (state) => {
        state.validatorsRecentLoading = true;
      })
      .addCase(getValidatorsRecent.fulfilled, (state, { payload }) => {
        state.validatorsRecentLoading = false;
        state.validators = payload.data.results;
        state.validatorsPages = payload.data.pages;
        state.validatorsTotal = payload.data.total;
      })
      .addCase(getValidatorsRecent.rejected, (state) => {
        state.validatorsRecentLoading = false;
      })
      /* -----------------
    GET_BLOCK_VALIDATORS
    -------------------*/
      .addCase(getBlockValidators.pending, (state) => {
        state.blockValidatorsLoading = true;
      })
      .addCase(getBlockValidators.fulfilled, (state, { payload }) => {
        state.blockValidatorsLoading = false;
        state.blockValidators = payload.data.results;
        state.blockValidatorsPages = payload.data.pages;
      })
      .addCase(getBlockValidators.rejected, (state) => {
        state.blockValidatorsLoading = false;
      });
  },
});
/* -----------------
SELECTORS
-------------------*/
export const selectValidator = (state: RootState) => state.validator;

export default validatorSlice.reducer;
