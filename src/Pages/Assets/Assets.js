import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { AssetsList } from './Components';

const Assets = () => (
  <Wrapper>
    <Header title="Assets" />
    <Section header>
      <AssetsList />
    </Section>
  </Wrapper>
);

export default Assets;
