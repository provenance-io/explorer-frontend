import { Section, Wrapper, Header } from 'Components';
import { AssetsList } from './Components';

const Assets = () => (
  <Wrapper>
    <Header title="All Assets" />
    <Section header>
      <AssetsList />
    </Section>
  </Wrapper>
);

export default Assets;
