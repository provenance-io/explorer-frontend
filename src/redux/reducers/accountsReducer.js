import { handleActions } from 'redux-actions';
import {
  GET_ACCOUNT_INFO,
  GET_ACCOUNT_TXS,
  GET_ACCOUNT_DELEGATIONS,
  GET_ACCOUNT_REDELEGATIONS,
  GET_ACCOUNT_REWARDS,
  GET_ACCOUNT_UNBONDING,
} from '../actions/accountsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Account
  accountInfo: {},
  accountInfoLoading: false,
  // Account Txs
  accountTxsLoading: false,
  accountTxs: [],
  accountTxsPages: 0,
  // Account Assets (Get brought in with account info)
  accountAssetsLoading: false,
  accountAssets: [],
  accountAssetsPages: 0,
  // Account Delegations
  accountDelegationsLoading: false,
  accountDelegations: [],
  accountDelegationsPages: 0,
  // Account Redelegations
  accountRedelegationsLoading: false,
  accountRedelegations: [],
  accountRedelegationsPages: 0,
  // Account Rewards
  accountRewardsLoading: false,
  accountRewards: [],
  accountRewardsPages: 0,
  // Account Unbonding
  accountUnbondingLoading: false,
  accountUnbonding: [],
  accountUnbondingPages: 0,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_ACCOUNT_INFO
    -------------------*/
    [`${GET_ACCOUNT_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        accountInfoLoading: true,
        accountAssetsLoading: true,
      };
    },
    [`${GET_ACCOUNT_INFO}_${SUCCESS}`](state, { payload: accountInfo }) {
      return {
        ...state,
        accountInfoLoading: false,
        accountAssetsLoading: false,
        accountInfo,
        accountAssets: accountInfo.balances || [],
      };
    },
    [`${GET_ACCOUNT_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        accountInfoLoading: false,
        accountAssetsLoading: false,
      };
    },
    /* -----------------
    GET_ACCOUNT_TXS
    -------------------*/
    [`${GET_ACCOUNT_TXS}_${REQUEST}`](state) {
      return {
        ...state,
        accountTxsLoading: true,
      };
    },
    [`${GET_ACCOUNT_TXS}_${SUCCESS}`](state, { payload }) {
      const { pages: accountTxsPages, results: accountTxs } = payload;

      return {
        ...state,
        accountTxsLoading: false,
        accountTxs,
        accountTxsPages,
      };
    },
    [`${GET_ACCOUNT_TXS}_${FAILURE}`](state) {
      return {
        ...state,
        accountTxsLoading: false,
      };
    },
    /* -----------------
    GET_ACCOUNT_DELEGATIONS
    -------------------*/
    [`${GET_ACCOUNT_DELEGATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        accountDelegationsLoading: true,
      };
    },
    [`${GET_ACCOUNT_DELEGATIONS}_${SUCCESS}`](state, { payload }) {
      console.log(payload);
      return {
        ...state,
        accountDelegationsLoading: false,
      };
    },
    [`${GET_ACCOUNT_DELEGATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        accountDelegationsLoading: false,
      };
    },
    /* -----------------
    GET_ACCOUNT_REDELEGATIONS
    -------------------*/
    [`${GET_ACCOUNT_REDELEGATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        accountRedelegationsLoading: true,
      };
    },
    [`${GET_ACCOUNT_REDELEGATIONS}_${SUCCESS}`](state) {
      return {
        ...state,
        accountRedelegationsLoading: false,
      };
    },
    [`${GET_ACCOUNT_REDELEGATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        accountRedelegationsLoading: false,
      };
    },
    /* -----------------
    GET_ACCOUNT_REWARDS
    -------------------*/
    [`${GET_ACCOUNT_REWARDS}_${REQUEST}`](state) {
      return {
        ...state,
        accountRewardsLoading: true,
      };
    },
    [`${GET_ACCOUNT_REWARDS}_${SUCCESS}`](state) {
      return {
        ...state,
        accountRewardsLoading: false,
      };
    },
    [`${GET_ACCOUNT_REWARDS}_${FAILURE}`](state) {
      return {
        ...state,
        accountRewardsLoading: false,
      };
    },
    /* -----------------
    GET_ACCOUNT_UNBONDING
    -------------------*/
    [`${GET_ACCOUNT_UNBONDING}_${REQUEST}`](state) {
      return {
        ...state,
        accountUnbondingLoading: true,
      };
    },
    [`${GET_ACCOUNT_UNBONDING}_${SUCCESS}`](state) {
      return {
        ...state,
        accountUnbondingLoading: false,
      };
    },
    [`${GET_ACCOUNT_UNBONDING}_${FAILURE}`](state) {
      return {
        ...state,
        accountUnbondingLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
