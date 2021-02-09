import { handleActions } from 'redux-actions';
import { GET_ACCOUNT_INFO } from '../actions/accountsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Accounts
  accountInfo: {},
  // Loading states
  accountInfoLoading: false,
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
      };
    },
    [`${GET_ACCOUNT_INFO}_${SUCCESS}`](state, { payload: addressInfo }) {
      return {
        ...state,
        accountInfoLoading: false,
        accountInfo: {},
      };
    },
    [`${GET_ACCOUNT_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        accountInfoLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
