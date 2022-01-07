import { handleActions } from 'redux-actions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/xhrActions';
import { GET_NFT_DETAIL, GET_NFT_RECORDS, GET_NFT_BY_OWNER } from '../actions/nftActions';

export const initialState = {
  nftDetailLoading: false,
  nftRecordsLoading: false,
  nftByOwnerLoading: false,

  nftByOwnerPages: 1,

  nftDetail: [],
  nftRecords: [],
  nftByOwner: [],
};

const reducer = handleActions(
  {
    /* -----------------
    GET_NFT_DETAIL
    -------------------*/
    [`${GET_NFT_DETAIL}_${REQUEST}`](state) {
      return {
        ...state,
        nftDetail: null,
        nftDetailLoading: true,
      };
    },
    [`${GET_NFT_DETAIL}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        nftDetail: payload,
        nftDetailLoading: false,
      };
    },
    [`${GET_NFT_DETAIL}_${FAILURE}`](state) {
      return {
        ...state,
        nftDetailLoading: false,
      };
    },
    /* -----------------
    GET_NFT_RECORDS
    -------------------*/
    [`${GET_NFT_RECORDS}_${REQUEST}`](state) {
      return {
        ...state,
        nftRecordsLoading: true,
      };
    },
    [`${GET_NFT_RECORDS}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        nftRecordsLoading: false,
        nftRecords: payload.filter(record => !record.status.match(/NON_CONFORMING|ORPHAN/)),
      };
    },
    [`${GET_NFT_RECORDS}_${FAILURE}`](state) {
      return {
        ...state,
        nftRecordsLoading: false,
      };
    },
    /* -----------------
    GET_NFT_BY_OWNER
    -------------------*/
    [`${GET_NFT_BY_OWNER}_${REQUEST}`](state) {
      return {
        ...state,
        nftByOwnerLoading: true,
      };
    },
    [`${GET_NFT_BY_OWNER}_${SUCCESS}`](state, { payload }) {
      const { pages: nftByOwnerPages, results: nftByOwner } = payload;
      return {
        ...state,
        nftByOwner,
        nftByOwnerPages,
        nftByOwnerLoading: false,
      };
    },
    [`${GET_NFT_BY_OWNER}_${FAILURE}`](state) {
      return {
        ...state,
        nftByOwnerLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
