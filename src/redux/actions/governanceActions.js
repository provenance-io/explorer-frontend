import qs from 'query-string';
import { GOVERNANCE_ADDRESS_URL, GOVERNANCE_PROPOSALS_URL } from 'consts';
import { ajaxGet } from './xhrActions';

const NS = 'GOV';
export const GET_PROPOSAL = `${NS}::GET_PROPOSAL`;
export const GET_PROPOSAL_DEPOSITS = `${NS}::GET_PROPOSAL_DEPOSITS`;
export const GET_PROPOSAL_VOTES = `${NS}::GET_PROPOSAL_VOTES`;
export const GET_PROPOSALS = `${NS}::GET_PROPOSALS`;
export const GET_VOTES_BY_ADDRESS = `${NS}::GET_VOTES_BY_ADDRESS`;

export const getProposal = proposalId => dispatch =>
  ajaxGet(GET_PROPOSAL, dispatch, `${GOVERNANCE_PROPOSALS_URL}/${proposalId}`);

export const getProposalDeposits =
  ({ proposalId, count = 10, page = 1 }) =>
  dispatch =>
    ajaxGet(
      GET_PROPOSAL_DEPOSITS,
      dispatch,
      `${GOVERNANCE_PROPOSALS_URL}/${proposalId}/deposits?${qs.stringify({ count, page })}`
    );

export const getProposalVotes = proposalId => dispatch =>
  ajaxGet(GET_PROPOSAL_VOTES, dispatch, `${GOVERNANCE_PROPOSALS_URL}/${proposalId}/votes`);

export const getAllProposals =
  ({ count = 10, page = 1 }) =>
  dispatch =>
    ajaxGet(
      GET_PROPOSALS,
      dispatch,
      `${GOVERNANCE_PROPOSALS_URL}/all?${qs.stringify({ count, page })}`
    );

export const getVotesByAddress =
  ({ address, count = 10, page = 1 }) =>
  dispatch =>
    ajaxGet(
      GET_VOTES_BY_ADDRESS,
      dispatch,
      `${GOVERNANCE_ADDRESS_URL}/${address}/votes?${qs.stringify({ count, page })}`
    );
