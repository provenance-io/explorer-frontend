import React from 'react';
import { Wrapper, Section, Header } from 'Components';
import { useTxs } from 'redux/hooks';
import { TxList } from './Components';

const Txs = () => {
  const { txTotal } = useTxs();

  return (
    <Wrapper>
      <Header title="Transaction List" value={`${txTotal} total`} />
      <Section header>
        <TxList />
      </Section>
    </Wrapper>
  );
};

export default Txs;
