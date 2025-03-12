import React from 'react';
import { useChain } from '@cosmos-kit/react';
import { useWalletConnect } from "@provenanceio/walletconnect-js";
import { Loading } from '../../../Components';
import { useVoting, useGovernance, useApp } from '../../../redux/hooks';
import ManageVotingModal from './ManageVotingModal';
import { CHAIN_NAME } from '../../../config';

const ProposalVoting = () => {
  const { ManageVotingBtn, modalFns, voted, setVoted } = useVoting();
  const { proposal, proposalVotesLoading } = useGovernance();
  const { isLoggedIn } = useApp();

  const {
    header: { description, proposalId, title },
  } = proposal;

  const { address } = useChain(CHAIN_NAME);
  const { walletConnectState } = useWalletConnect();

  const walletAddress = address ? address : walletConnectState.address;

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
          voterId={String(walletAddress)}
          title={title as string}
          voted={voted}
          setVoted={setVoted}
        />
      )}
    </>
  );
};

export default ProposalVoting;
