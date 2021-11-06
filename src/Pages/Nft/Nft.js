import { Header, Section, Wrapper } from 'Components';
import { useParams } from 'react-router';
import { NftRecords, NftSpotlight, NftTxs } from './Components';

const Nft = () => {
  const { addr } = useParams();

  return (
    <Wrapper>
      <Header
        title="NFT Detail"
        value={addr}
        copyValue={addr}
        copyTitle={`Copy Address ID ${addr}`}
      />
      <Section header>
        <NftSpotlight />
      </Section>
      <Section>
        <NftTxs />
      </Section>
      <Section>
        <NftRecords />
      </Section>
    </Wrapper>
  );
};

export default Nft;
