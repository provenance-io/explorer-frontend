import { Section, Wrapper, Header } from 'Components';
import { BlockDetails, BlockPagination, BlockValidators, BlockTxs } from './Components';

const Block = () => (
  <Wrapper>
    <Header title="Block Details">
      <BlockPagination />
    </Header>
    <Section header>
      <BlockDetails />
    </Section>
    <Section>
      <BlockValidators />
    </Section>
    <Section>
      <BlockTxs />
    </Section>
  </Wrapper>
);

export default Block;
