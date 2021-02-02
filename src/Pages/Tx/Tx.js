import React from 'react';
import { Wrapper, Header } from 'Components';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { TxHeader, TxInformation } from './Components';

const Tx = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('lg'));

  return (
    <Wrapper>
      <Header title={isMed ? 'Tx Details' : 'Transaction Details'}>
        <TxHeader isMed={isMed} />
      </Header>
      <TxInformation />
    </Wrapper>
  );
};

export default Tx;
