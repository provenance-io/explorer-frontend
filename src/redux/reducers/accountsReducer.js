import { handleActions } from 'redux-actions';
import { GET_ACCOUNT_INFO, GET_ACCOUNT_TXS } from '../actions/accountsActions';
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
  },
  initialState
);

export default reducer;
