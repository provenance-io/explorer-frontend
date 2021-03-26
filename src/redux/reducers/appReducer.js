import { handleActions } from 'redux-actions';
import { setCookie, getCookie } from 'utils';
import { SET_THEME, GET_CHAINCODE_ID } from '../actions/appActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Misc
  topCount: 10,
  tableCount: 10,
  validatorCount: 100,
  theme: getCookie('theme') || 'default',
  chaincodeId: '',
  // Loading states
  chaincodeIdLoading: false,
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
