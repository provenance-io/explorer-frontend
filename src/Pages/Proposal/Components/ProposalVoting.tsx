import React from 'react';
import { useWallet } from '@provenanceio/wallet-lib';
import { Loading } from 'Components'; 
import { useVoting, useGovernance, useApp } from '../../../redux/hooks';
import ManageVotingModal from "./ManageVotingModal";

const ProposalVoting = () => {
  const { handleVoting, ManageVotingBtn, modalFns, voted, setVoted } = useVoting();
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
          proposalId={proposalId as number}
          description={description as string}
          voterId={address}
          title={title as string}
          voted={voted}
          setVoted={setVoted}
        />
      }
    </>
  )
}

export default ProposalVoting;