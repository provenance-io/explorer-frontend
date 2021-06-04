import React from 'react';
import { Wrapper, Header } from 'Components';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { useParams } from 'react-router-dom';
import { TxInformation } from './Components';

const Tx = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('lg'));
  const { txHash } = useParams();

  return (
    <Wrapper>
      <Header
        title={isMed ? 'Tx Details' : 'Transaction Details'}
        value={isMed ? maxLength(txHash, 12, 6) : txHash}
        copyTitle={`Copy Transaction Hash ${txHash}`}
        copyValue={txHash}
      />
      <TxInformation />
    </Wrapper>
  );
};

export default Tx;
