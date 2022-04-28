import React from 'react';
import { useWallet } from '@provenanceio/wallet-lib';
import { useVoting, useGovernance, useApp } from 'redux/hooks';
import { Loading } from 'Components'; 
import ManageVotingModal from "./ManageVotingModal";

const ProposalVoting = () => {
  const { handleVoting, ManageVotingBtn, modalFns, voted } = useVoting();
  const { proposal, proposalVotesLoading } = useGovernance();
  const { isLoggedIn } = useApp();
  const { walletService } = useWallet();

  const {
    header: {
      description,
      proposalId,
      title,
    },
  } = proposal;

  const {
    state: { address },
  } = walletService;

  return (
    <>
      {!proposalId ? <Loading /> :
      <ManageVotingBtn title={`Proposal ${proposalId}`}/>}
      {!proposalVotesLoading &&
        <ManageVotingModal 
          isLoggedIn={isLoggedIn}
          modalOpen={modalFns.modalOpen}
          onClose={modalFns.deactivateModalOpen}
          onVoting={handleVoting}
          proposalId={proposalId}
          description={description}
          voterId={address}
          title={title}
          voted={voted}
        />
      }
    </>
  )
}

export default ProposalVoting;