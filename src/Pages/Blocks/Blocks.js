import React from 'react';
import { Wrapper, Section, Header } from 'Components';
import { BlocksHeader, BlocksList } from './Components';

const Blocks = () => (
  <Wrapper>
    <Header title="Blocks List">
      <BlocksHeader />
    </Header>
    <Section header>
      <BlocksList />
    </Section>
  </Wrapper>
);

export default Blocks;
