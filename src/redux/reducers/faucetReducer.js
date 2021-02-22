import { handleActions } from 'redux-actions';
import { SEND_FAUCET_ADDRESS } from '../actions/faucetActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  faucetRequestStatus: 'none',
};

const reducer = handleActions(
  {
    /* -----------------
    SEND_FAUCET_ADDRESS
    -------------------*/
    [`${SEND_FAUCET_ADDRESS}_${REQUEST}`](state) {
      return {
        ...state,
        faucetRequestStatus: 'loading',
      };
    },
    [`${SEND_FAUCET_ADDRESS}_${SUCCESS}`](state) {
      return {
        ...state,
        faucetRequestStatus: 'success',
      };
    },
    [`${SEND_FAUCET_ADDRESS}_${FAILURE}`](state) {
      return {
        ...state,
        faucetRequestStatus: 'failure',
      };
    },
  },
  initialState
);

export default reducer;
