import { handleActions } from 'redux-actions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/xhrActions';
import {
  GET_NFT_DETAIL,
  GET_NFT_RECORDS,
  GET_NFT_BY_OWNER,
  GET_NFT_ADDRESS,
} from '../actions/nftActions';

export const initialState = {
  nftDetailLoading: false,
  nftRecordsLoading: false,
  nftByOwnerLoading: false,
  nftAddressLoading: false,

  nftDetail: [],
  nftRecords: [],
  nftByOwner: [],
  nftAddress: [],
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
        nftRecordsLoading: true,
        nftRecords: payload,
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
      return {
        ...state,
        nftByOwner: payload,
        nftByOwnerLoading: false,
      };
    },
    [`${GET_NFT_BY_OWNER}_${FAILURE}`](state) {
      return {
        ...state,
        nftByOwnerLoading: false,
      };
    },
    /* -----------------
    GET_NFT_ADDRESS
    -------------------*/
    [`${GET_NFT_ADDRESS}_${REQUEST}`](state) {
      return {
        ...state,
        nftAddressLoading: false,
      };
    },
    [`${GET_NFT_ADDRESS}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        nftAddressLoading: false,
        nftAddress: payload,
      };
    },
    [`${GET_NFT_ADDRESS}_${FAILURE}`](state) {
      return {
        ...state,
        nftAddressLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
