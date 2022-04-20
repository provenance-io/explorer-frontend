import React from 'react';
import { Wrapper, Header } from 'Components';
import { ProposalsList } from './Components';

const Proposals = () => (
  <Wrapper>
    <Header title="All Proposals" />
    <ProposalsList />
  </Wrapper>
);
export default Proposals;
