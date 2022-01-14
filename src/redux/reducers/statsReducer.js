import { handleActions } from 'redux-actions';
import { Skips } from '../../consts';
import { GET_UPGRADE_INFO } from '../actions/statsActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
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
    [`${GET_UPGRADE_INFO}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        upgradeInfo: payload.reverse().map(i => ({
          ...i,
          events:
            Skips[i.upgradeName] ||
            (i.scheduled
              ? `Not yet applied - will be applied at upgrade height ${i.upgradeHeight}`
              : ''),
        })),
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
