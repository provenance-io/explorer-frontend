import React from 'react';
import { Loading } from '../../../Components';
import { useVoting, useGovernance, useApp } from '../../../redux/hooks';
import ManageVotingModal from './ManageVotingModal';

const ProposalVoting = () => {
  const { ManageVotingBtn, modalFns, voted, setVoted } = useVoting();
  const { proposal, proposalVotesLoading } = useGovernance();
  const { isLoggedIn } = useApp();
  // const { walletConnectState } = useWalletConnect();

  const {
    header: { description, proposalId, title },
  } = proposal;

  // TODO: Update this
  const address = '';
  // const { address } = walletConnectState;

  return (
    <>
      {!proposalId ? <Loading /> : <ManageVotingBtn title={`Proposal ${proposalId}`} />}
      {!proposalVotesLoading && (
        <ManageVotingModal
          isLoggedIn={isLoggedIn}
          modalOpen={modalFns.modalOpen}
          onClose={modalFns.deactivateModalOpen}
          proposalId={proposalId as number}
          description={description as string}
          voterId={address}
          title={title as string}
          voted={voted}
          setVoted={setVoted}
        />
      )}
    </>
  );
};

export default ProposalVoting;
