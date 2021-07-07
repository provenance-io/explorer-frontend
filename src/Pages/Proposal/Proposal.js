import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper, Header, Section } from 'Components';
import { useGovernance } from 'redux/hooks';
import { ProposalInformation } from './Components';

const Proposal = () => {
  const { proposalId } = useParams();
  const { getProposal } = useGovernance();

  useEffect(() => {
    getProposal(proposalId);
  }, [getProposal, proposalId]);

  return (
    <Wrapper>
      <Header
        title="Proposal"
        value={proposalId}
        copyTitle={`Copy Proposal Id ${proposalId}`}
        copyValue={proposalId}
      />
      <Section header>
        <ProposalInformation />
      </Section>
    </Wrapper>
  );
};

export default Proposal;
