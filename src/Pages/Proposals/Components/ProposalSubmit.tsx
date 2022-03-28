import React from 'react';
import { useWallet } from '@provenanceio/wallet-lib';
import { useProposal, useGovernance, useApp } from 'redux/hooks';
import { Loading } from 'Components'; 
import { ManageProposalModal } from ".";

const ProposalProposal = () => {
  const { handleProposal, ManageProposalBtn, modalFns } = useProposal();
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
      {!address ? <Loading /> :
      <ManageProposalBtn />}
      {!proposalVotesLoading &&
        <ManageProposalModal 
          isLoggedIn={isLoggedIn}
          modalOpen={modalFns.modalOpen}
          onClose={modalFns.deactivateModalOpen}
          onProposal={handleProposal}
          proposalId={proposalId}
          description={description}
          voterId={address}
          title={title}
        />
      }
    </>
  )
}

export default ProposalProposal;