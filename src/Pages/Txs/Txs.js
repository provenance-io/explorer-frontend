import React from 'react';
import { Wrapper, Section, Header } from 'Components';
import { TxHeader, TxList } from './Components';

const Txs = () => (
  <Wrapper>
    <Header title="Transaction List">
      <TxHeader />
    </Header>
    <Section header>
      <TxList />
    </Section>
  </Wrapper>
);

export default Txs;
