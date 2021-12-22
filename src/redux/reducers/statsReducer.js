import { handleActions } from 'redux-actions';
import {
  GET_UPGRADE_INFO, // To-Do: Add more here once this is working
} from '../actions/statsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  //To-Do: Add more here once this is working
  // Upgrade Info
  upgradeInfo: [],
  upgradeInfoLoading: false,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_UPGRADE_INFO
    -------------------*/
    [`${GET_UPGRADE_INFO}_${REQUEST}`](state) {
      return {
        ...state,
        upgradeInfoLoading: true,
      };
    },
    [`${GET_UPGRADE_INFO}_${SUCCESS}`](state, { payload: upgradeInfo }) {
      return {
        ...state,
        upgradeInfo,
        upgradeInfoLoading: false,
      };
    },
    [`${GET_UPGRADE_INFO}_${FAILURE}`](state) {
      return {
        ...state,
        upgradeInfoLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
