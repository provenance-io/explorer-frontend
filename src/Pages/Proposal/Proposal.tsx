import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper, Header, Section, Loading } from 'Components';
import { isEmpty } from 'utils';
import { useWalletConnect } from '@provenanceio/walletconnect-js';
import { useGovernance, useAccounts, useApp } from '../../redux/hooks';
import {
  ProposalDeposits,
  ProposalInformation,
  ProposalTimingTable,
  ProposalVotingChart,
  ProposalVotingTable,
  ProposalVoting,
  ProposalQuorumChart,
  ProposalDepositsChart,
} from './Components';

interface ParamsProps {
  proposalId: string;
}

const Proposal = () => {
  const { proposalId } = useParams<ParamsProps>();
  const { proposal, proposalLoading, getProposal } = useGovernance();
  const { timings } = proposal;
  const { accountAssets, getAccountAssets } = useAccounts();
  const { isLoggedIn } = useApp();
  const { walletConnectState } = useWalletConnect();
  const { address } = walletConnectState;
  const hashBalance: { amount: string; denom: string } = accountAssets?.find(
    (b: { amount: string; denom: string }) => b.denom === 'nhash'
  ) as { amount: string; denom: string };
  const hasHash = !isEmpty(hashBalance) && parseFloat(hashBalance.amount) > 0;

  const votingIsOpen =
    !isEmpty(timings) &&
    // Check to make sure voting time is valid
    timings?.votingTime.startTime.slice(0, 4) !== '1901' &&
    // Check for if we are at a time after start time
    new Date().getTime() > new Date(timings?.votingTime?.startTime as string).getTime() &&
    // Check that we are before the end time
    new Date().getTime() < new Date(timings?.votingTime.endTime as string).getTime();

  const canVote = !isEmpty(timings) && votingIsOpen && isLoggedIn && hasHash;

  useEffect(() => {
    if (address) {
      // TODO: Need an endpoint that only returns a users hash value
      getAccountAssets({ address, count: 100 });
    }
  }, [getAccountAssets, address]);

  useEffect(() => {
    getProposal(proposalId);
  }, [getProposal, proposalId]);

  return !proposalLoading ? (
    <Wrapper>
      <Header
        title="Proposal"
        value={proposalId}
        copyTitle={`Copy Proposal Id ${proposalId}`}
        copyValue={proposalId}
      />
      {canVote ? (
        <>
          {
            <Section header>
              <ProposalVoting />
            </Section>
          }
          <Section>
            <ProposalInformation />
          </Section>
        </>
      ) : (
        <Section header>
          <ProposalInformation />
        </Section>
      )}
      <Section>
        <ProposalTimingTable />
      </Section>
      <Section>
        <ProposalDepositsChart />
      </Section>
      <Section>
        <ProposalDeposits />
      </Section>
      <Section>
        <ProposalQuorumChart />
      </Section>
      <Section>
        <ProposalVotingChart />
      </Section>
      <Section>
        <ProposalVotingTable />
      </Section>
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default Proposal;
