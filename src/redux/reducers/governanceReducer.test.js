import reducer, { initialState } from './governanceReducer';
import { REQUEST, SUCCESS, FAILURE } from '../actions/xhrActions';
import {
  GET_PROPOSAL,
  GET_PROPOSAL_DEPOSITS,
  GET_PROPOSAL_VOTES,
  GET_PROPOSALS,
  GET_VOTES_BY_ADDRESS,
} from '../actions/governanceActions';

describe('reducer: governance', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'DOESNT_EXIST' })).toEqual(initialState);
  });

  /* -----------------
    GET_PROPOSAL
  -------------------*/
  it(`should handle ${GET_PROPOSAL}_${REQUEST}`, () => {
    const action = { type: `${GET_PROPOSAL}_${REQUEST}` };
    expect(reducer(undefined, action)).toEqual({ ...initialState, proposalLoading: true });
  });

  it(`should handle ${GET_PROPOSAL}_${SUCCESS}`, () => {
    const payload = { id: 123, proposalStuff: 'exists' };
    const action = { type: `${GET_PROPOSAL}_${SUCCESS}`, payload };
    expect(reducer(undefined, action)).toEqual({ ...initialState, proposal: payload });
  });

  it(`should handle ${GET_PROPOSAL}_${FAILURE}`, () => {
    const action = { type: `${GET_PROPOSAL}_${FAILURE}` };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  /* -----------------
    GET_PROPOSAL_DEPOSITS
  -------------------*/
  it(`should handle ${GET_PROPOSAL_DEPOSITS}_${REQUEST}`, () => {
    const action = { type: `${GET_PROPOSAL_DEPOSITS}_${REQUEST}` };
    expect(reducer(undefined, action)).toEqual({ ...initialState, proposalDepositsLoading: true });
  });

  it(`should handle ${GET_PROPOSAL_DEPOSITS}_${SUCCESS}`, () => {
    const payload = { pages: 12, results: [{ id: 123, proposalStuff: 'exists' }] };
    const action = { type: `${GET_PROPOSAL_DEPOSITS}_${SUCCESS}`, payload };
    expect(reducer(undefined, action)).toEqual({
      ...initialState,
      proposalDeposits: payload.results,
      proposalDepositsPages: payload.pages,
    });
  });

  it(`should handle ${GET_PROPOSAL_DEPOSITS}_${FAILURE}`, () => {
    const action = { type: `${GET_PROPOSAL_DEPOSITS}_${FAILURE}` };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  /* -----------------
    GET_PROPOSAL_VOTES
  -------------------*/
  it(`should handle ${GET_PROPOSAL_VOTES}_${REQUEST}`, () => {
    const action = { type: `${GET_PROPOSAL_VOTES}_${REQUEST}` };
    expect(reducer(undefined, action)).toEqual({ ...initialState, proposalVotesLoading: true });
  });

  it(`should handle ${GET_PROPOSAL_VOTES}_${SUCCESS}`, () => {
    const payload = { id: 123, proposalStuff: 'exists' };
    const action = { type: `${GET_PROPOSAL_VOTES}_${SUCCESS}`, payload };
    expect(reducer(undefined, action)).toEqual({ ...initialState, proposalVotes: payload });
  });

  it(`should handle ${GET_PROPOSAL_VOTES}_${FAILURE}`, () => {
    const action = { type: `${GET_PROPOSAL_VOTES}_${FAILURE}` };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  /* -----------------
      GET_PROPOSALS
    -------------------*/
  it(`should handle ${GET_PROPOSALS}_${REQUEST}`, () => {
    const action = { type: `${GET_PROPOSALS}_${REQUEST}` };
    expect(reducer(undefined, action)).toEqual({ ...initialState, proposalsLoading: true });
  });

  it(`should handle ${GET_PROPOSALS}_${SUCCESS}`, () => {
    const payload = { pages: 25, results: [{ id: 123, proposalStuff: 'exists' }] };
    const action = { type: `${GET_PROPOSALS}_${SUCCESS}`, payload };
    expect(reducer(undefined, action)).toEqual({
      ...initialState,
      proposals: payload.results,
      proposalsPages: payload.pages,
    });
  });

  it(`should handle ${GET_PROPOSALS}_${FAILURE}`, () => {
    const action = { type: `${GET_PROPOSALS}_${FAILURE}` };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  /* -----------------
      GET_VOTES_BY_ADDRESS
    -------------------*/
  it(`should handle ${GET_VOTES_BY_ADDRESS}_${REQUEST}`, () => {
    const action = { type: `${GET_VOTES_BY_ADDRESS}_${REQUEST}` };
    expect(reducer(undefined, action)).toEqual({ ...initialState, addressVotesLoading: true });
  });

  it(`should handle ${GET_VOTES_BY_ADDRESS}_${SUCCESS}`, () => {
    const payload = { pages: 12, results: [{ id: 123, proposalStuff: 'exists' }] };
    const action = { type: `${GET_VOTES_BY_ADDRESS}_${SUCCESS}`, payload };
    expect(reducer(undefined, action)).toEqual({
      ...initialState,
      addressVotes: payload.results,
      addressVotesPages: payload.pages,
    });
  });

  it(`should handle ${GET_VOTES_BY_ADDRESS}_${FAILURE}`, () => {
    const action = { type: `${GET_VOTES_BY_ADDRESS}_${FAILURE}` };
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});
