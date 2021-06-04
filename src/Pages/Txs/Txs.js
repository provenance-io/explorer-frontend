import React from 'react';
import { Wrapper, Section, Header } from 'Components';
import { useTxs } from 'redux/hooks';
import { TxList } from './Components';

const Txs = () => {
  const { txsPages, txs } = useTxs();
  // The api sends through a page count (tableCount) and returns a total amount of pages
  const txsTotal = txsPages * txs.length;

  return (
    <Wrapper>
      <Header title="Transaction List" value={`${txsTotal} total`} />
      <Section header>
        <TxList />
      </Section>
    </Wrapper>
  );
};

export default Txs;
