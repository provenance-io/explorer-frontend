import configureMockStore from 'redux-mock-store';
import qs from 'query-string';
import thunk from 'redux-thunk';
import { GOVERNANCE_ADDRESS_URL, GOVERNANCE_PROPOSALS_URL, GOVERNANCE_VOTES_URL } from 'consts';
import * as actions from './governanceActions';
import { ajaxGet } from './xhrActions';

const middlewares = [thunk];
const mockstore = configureMockStore(middlewares);

jest.mock('./xhrActions');

describe('actions: governance', () => {
  let store;
  let dispatch;

  beforeAll(() => {
    store = mockstore({});
    dispatch = store.dispatch;
    ajaxGet.mockImplementation(() => Promise.resolve());
  });

  afterAll(() => {
    ajaxGet.mockRestore();
  });

  it(`should handle getProposal`, async () => {
    const proposalId = 123;
    await dispatch(actions.getProposal(proposalId));
    expect(ajaxGet).toHaveBeenCalledWith(
      actions.GET_PROPOSAL,
      expect.any(Function),
      `${GOVERNANCE_PROPOSALS_URL}/${proposalId}`
    );
  });

  it('should handle getProposalDeposits', async () => {
    const proposalId = 123;
    const count = 20;
    const page = 10;
    await dispatch(actions.getProposalDeposits({ proposalId, count, page }));
    expect(ajaxGet).toHaveBeenCalledWith(
      actions.GET_PROPOSAL_DEPOSITS,
      expect.any(Function),
      `${GOVERNANCE_PROPOSALS_URL}/${proposalId}/deposits?count=${count}&page=${page}`
    );
  });

  it('should handle getVotesByProposal', async () => {
    const proposalId = 123;
    const count = 20;
    const page = 10;
    await dispatch(actions.getVotesByProposal({ proposalId, count, page }));
    expect(ajaxGet).toHaveBeenCalledWith(
      actions.GET_VOTES_BY_PROPOSAL,
      expect.any(Function),
      `${GOVERNANCE_VOTES_URL}/${proposalId}/votes?${qs.stringify({ count, page })}`
    );
  });

  it('should handle getAllProposals', async () => {
    const count = 20;
    const page = 10;
    await dispatch(actions.getAllProposals({ count, page }));
    expect(ajaxGet).toHaveBeenCalledWith(
      actions.GET_PROPOSALS,
      expect.any(Function),
      `${GOVERNANCE_PROPOSALS_URL}/all?count=${count}&page=${page}`
    );

    await dispatch(actions.getAllProposals());
    expect(ajaxGet).toHaveBeenCalledWith(
      actions.GET_PROPOSALS,
      expect.any(Function),
      `${GOVERNANCE_PROPOSALS_URL}/all?count=10&page=1`
    );
  });

  it('should handle getVotesByAddress', async () => {
    const address = '12345678';
    const count = 20;
    const page = 10;
    await dispatch(actions.getVotesByAddress({ address, count, page }));
    expect(ajaxGet).toHaveBeenCalledWith(
      actions.GET_VOTES_BY_ADDRESS,
      expect.any(Function),
      `${GOVERNANCE_ADDRESS_URL}/${address}/votes?count=${count}&page=${page}`
    );
  });
});
