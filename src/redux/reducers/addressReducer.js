import { handleActions } from 'redux-actions';
import { GET_ADDRESS_INFO } from '../actions/addressActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  // Address
  addressInfo: {},
  // Loading states
  addressInfoLoading: false,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_ADDRESS_INFO
    -------------------*/
    [`${GET_ADDRESS_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        addressInfoLoading: true,
      };
    },
    [`${GET_ADDRESS_INFO}_${SUCCESS}`](state, { payload: addressInfo }) {
      return {
        ...state,
        addressInfoLoading: false,
        addressInfo: {},
      };
    },
    [`${GET_ADDRESS_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        addressInfoLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
