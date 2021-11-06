import { Wrapper, Section, Header } from 'Components';
import { useParams } from 'react-router';
import { NftList } from './Components';

const Nfts = () => {
  const { addr } = useParams();

  return (
    <Wrapper>
      <Header
        title="NFT List"
        value={addr}
        copyValue={addr}
        copyTitle={`Copy Address ID ${addr}`}
      />
      <Section header>
        <NftList />
      </Section>
    </Wrapper>
  );
};

export default Nfts;
