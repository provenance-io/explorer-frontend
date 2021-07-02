import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { ProposalsList } from './Components';

const Proposals = () => (
  <Wrapper>
    <Header title="All Proposals" />
    <Section header>
      <ProposalsList />
    </Section>
  </Wrapper>
);
export default Proposals;
