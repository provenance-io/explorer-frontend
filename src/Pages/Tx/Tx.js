import React, { useEffect } from 'react';
import { Wrapper, Header, Section } from 'Components';
import { useMediaQuery, useTxs } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { useParams } from 'react-router-dom';
import { TxInformation, TxMsgs } from './Components';

const Tx = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('lg'));
  const { getTxInfo } = useTxs();
  const { txHash } = useParams();

  useEffect(() => {
    getTxInfo(txHash);
  }, [txHash, getTxInfo]);

  return (
    <Wrapper>
      <Header
        title={isMed ? 'Tx Details' : 'Transaction Details'}
        value={isMed ? maxLength(txHash, 12, 6) : txHash}
        copyTitle={`Copy Transaction Hash ${txHash}`}
        copyValue={txHash}
      />
      <Section header>
        <TxInformation />
      </Section>
      <Section>
        <TxMsgs />
      </Section>
    </Wrapper>
  );
};

export default Tx;
