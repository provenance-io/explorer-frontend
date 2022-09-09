import { Wrapper, Header, Section, Loading } from 'Components';
import { useMediaQuery, useTxs } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { useParams } from 'react-router-dom';
import { TxInformation, TxMsgs, TxFees, TxJSON } from './Components';

const Tx = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('lg'));
  const { txInfoLoading } = useTxs();
  const { txHash } = useParams();

  return txInfoLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header
        title={isMed ? 'Tx Details' : 'Transaction Details'}
        value={isMed ? maxLength(txHash, 12, 6) : txHash}
        copyTitle={`Copy Transaction Hash ${txHash}`}
        copyValue={txHash}
      />
      <Section header>
        <TxInformation />
        <TxFees />
      </Section>
      <Section>
        <TxJSON />
      </Section>
      <Section>
        <TxMsgs />
      </Section>
    </Wrapper>
  );
};

export default Tx;
