import React, { useEffect } from 'react';
// @ts-ignore
import { useParams } from 'react-router-dom';
import { Wrapper, Header, Section, Loading } from 'Components';
import { useGovernance, useAccounts, useApp } from 'redux/hooks';
import { isEmpty } from 'utils';
import {
  ProposalDeposits,
  ProposalInformation,
  ProposalTimingProgressBar,
  ProposalTimingTable,
  ProposalVotingGraph,
  ProposalVotingTable,
  ProposalVoting,
} from './Components';

const Proposal = () => {
  const { proposalId } = useParams();
  const { proposal, proposalLoading, getProposal } = useGovernance();
  const { timings } = proposal;
  const { accountAssets } = useAccounts();
  const hashBalance: { amount: string, denom: string } = accountAssets?.find((b: { amount: string, denom: string }) => b.denom === 'nhash');
  const hasHash = !isEmpty(hashBalance) && parseFloat(hashBalance.amount) > 0;
  const { isLoggedIn } = useApp();

  const canVote = !isEmpty(timings)
                  && (new Date().getTime()) > (new Date(timings.depositEndTime).getTime())
                  && isLoggedIn
                  && hasHash;

  useEffect(() => {
    getProposal(proposalId);
  }, [getProposal, proposalId]);

  return (
    !proposalLoading ?
      <Wrapper>
        <Header
          title="Proposal"
          value={proposalId}
          copyTitle={`Copy Proposal Id ${proposalId}`}
          copyValue={proposalId}
        />
        {canVote ? (
        <>
          {<Section header>
            <ProposalVoting />
          </Section>}
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
          <ProposalTimingProgressBar />
        </Section>
        <Section>
          <ProposalDeposits />
        </Section>
        <Section>
          <ProposalVotingGraph />
        </Section>
        <Section>
          <ProposalVotingTable />
        </Section>
      </Wrapper>
      : <Loading />
  );
};

export default Proposal;
