import React from 'react';
import { useWalletConnect } from '@provenanceio/walletconnect-js';
import { Loading } from 'Components';
import { useVoting, useGovernance, useApp } from '../../../redux/hooks';
import ManageVotingModal from './ManageVotingModal';

const ProposalVoting = () => {
  const { handleVoting, ManageVotingBtn, modalFns, voted, setVoted } = useVoting();
  const { proposal, proposalVotesLoading } = useGovernance();
  const { isLoggedIn } = useApp();
  const { walletConnectState } = useWalletConnect();

  const {
    header: { description, proposalId, title },
  } = proposal;

  const { address } = walletConnectState;

  return (
    <>
      {!proposalId ? <Loading /> : <ManageVotingBtn title={`Proposal ${proposalId}`} />}
      {!proposalVotesLoading && (
        <ManageVotingModal
          isLoggedIn={isLoggedIn}
          modalOpen={modalFns.modalOpen}
          onClose={modalFns.deactivateModalOpen}
          onVoting={handleVoting}
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
