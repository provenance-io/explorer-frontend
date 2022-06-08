import { handleActions } from 'redux-actions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';
import {
  GET_PROPOSAL,
  GET_PROPOSAL_DEPOSITS,
  GET_PROPOSALS,
  GET_VOTES_BY_ADDRESS,
  GET_VOTES_BY_PROPOSAL,
} from '../actions/governanceActions';

export const initialState = {
  // addressVotes
  addressVotes: [],
  addressVotesLoading: false,
  addressVotesPages: 0,
  // proposal
  proposal: {
    header: { proposer: {} },
  },
  tally: {},
  params: {},
  proposalLoading: false,
  // proposalDeposits
  proposalDeposits: [],
  proposalDepositsLoading: false,
  proposalDepositsPages: 0,
  // proposals
  proposals: [],
  proposalsLoading: false,
  proposalsPages: 0,
  // proposalVotes
  proposalVotes: [],
  proposalVotesLoading: false,
  proposalVotesPages: 0,
  proposalVotesTotal: 0,
};

const governanceReducer = handleActions(
  {
    /* -----------------
    GET_PROPOSAL
    -------------------*/
    [`${GET_PROPOSAL}_${REQUEST}`](state) {
      return {
        ...state,
        proposalLoading: true,
      };
    },

    [`${GET_PROPOSAL}_${SUCCESS}`](state, { payload: proposal }) {
      return {
        ...state,
        proposal,
        tally: proposal?.timings?.voting?.tally,
        params: proposal?.timings?.voting?.params,
        proposalLoading: false,
      };
    },

    [`${GET_PROPOSAL}_${FAILURE}`](state) {
      return {
        ...state,
        proposalLoading: false,
      };
    },

    /* -----------------
    GET_PROPOSAL_DEPOSITS
    -------------------*/
    [`${GET_PROPOSAL_DEPOSITS}_${REQUEST}`](state) {
      return {
        ...state,
        proposalDepositsLoading: true,
      };
    },

    [`${GET_PROPOSAL_DEPOSITS}_${SUCCESS}`](
      state,
      { payload: { pages: proposalDepositsPages, results: proposalDeposits } }
    ) {
      return {
        ...state,
        proposalDeposits,
        proposalDepositsLoading: false,
        proposalDepositsPages,
      };
    },

    [`${GET_PROPOSAL_DEPOSITS}_${FAILURE}`](state) {
      return {
        ...state,
        proposalDepositsLoading: false,
      };
    },

    /* -----------------
    GET_PROPOSALS
    -------------------*/
    [`${GET_PROPOSALS}_${REQUEST}`](state) {
      return {
        ...state,
        proposalsLoading: true,
      };
    },

    [`${GET_PROPOSALS}_${SUCCESS}`](
      state,
      { payload: { pages: proposalsPages, results: proposals } }
    ) {
      return {
        ...state,
        proposals,
        proposalsLoading: false,
        proposalsPages,
      };
    },

    [`${GET_PROPOSALS}_${FAILURE}`](state) {
      return {
        ...state,
        proposalsLoading: false,
      };
    },

    /* -----------------
    GET_VOTES_BY_ADDRESS
    -------------------*/
    [`${GET_VOTES_BY_ADDRESS}_${REQUEST}`](state) {
      return {
        ...state,
        addressVotesLoading: true,
      };
    },

    [`${GET_VOTES_BY_ADDRESS}_${SUCCESS}`](
      state,
      { payload: { pages: addressVotesPages, results: addressVotes } }
    ) {
      return {
        ...state,
        addressVotes,
        addressVotesLoading: false,
        addressVotesPages,
      };
    },

    [`${GET_VOTES_BY_ADDRESS}_${FAILURE}`](state) {
      return {
        ...state,
        addressVotesLoading: false,
      };
    },
    /* -----------------
    GET_VOTES_BY_PROPOSAL
    -------------------*/
    [`${GET_VOTES_BY_PROPOSAL}_${REQUEST}`](state) {
      return {
        ...state,
        proposalVotesLoading: true,
      };
    },

    [`${GET_VOTES_BY_PROPOSAL}_${SUCCESS}`](
      state,
      { payload: { pages: proposalVotesPages, results: proposalVotes, total: proposalVotesTotal } }
    ) {
      return {
        ...state,
        proposalVotes,
        proposalVotesLoading: false,
        proposalVotesPages,
        proposalVotesTotal,
      };
    },

    [`${GET_VOTES_BY_PROPOSAL}_${FAILURE}`](state) {
      return {
        ...state,
        proposalVotesLoading: false,
      };
    },
  },
  initialState
);

export default governanceReducer;
