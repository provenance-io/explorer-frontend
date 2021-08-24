import { handleActions } from 'redux-actions';
import { setCookie, getCookie } from 'utils';
import {
  GET_CHAINCODE_ID,
  SET_THEME,
  SET_WALLET_URL,
  SET_IS_LOGGED_IN,
} from '../actions/appActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Misc
  topCount: 10,
  tableCount: 30,
  validatorCount: 100,
  theme: getCookie('theme') || '',
  chaincodeId: '',
  // Loading states
  chaincodeIdLoading: false,
  walletUrl: getCookie('walletUrl', true) || '',
  isLoggedIn: false,
};

const reducer = handleActions(
  {
    [SET_THEME](state, { payload: theme }) {
      setCookie('theme', theme);

      return {
        ...state,
        theme,
      };
    },
    [SET_WALLET_URL](state, { payload: walletUrl }) {
      setCookie('walletUrl', walletUrl);

      return {
        ...state,
        walletUrl,
      };
    },
    [SET_IS_LOGGED_IN](state, { payload: isLoggedIn }) {
      return {
        ...state,
        isLoggedIn,
      };
    },
    /* -----------------
    GET_CHAINCODE_ID
    -------------------*/
    [`${GET_CHAINCODE_ID}_${REQUEST}`](state) {
      return {
        ...state,
        chaincodeIdLoading: true,
      };
    },
    [`${GET_CHAINCODE_ID}_${SUCCESS}`](state, { payload: chaincodeId }) {
      return {
        ...state,
        chaincodeId,
        chaincodeIdLoading: false,
      };
    },
    [`${GET_CHAINCODE_ID}_${FAILURE}`](state) {
      return {
        ...state,
        chaincodeIdLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
