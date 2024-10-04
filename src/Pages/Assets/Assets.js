import React from 'react';
import { Section, Wrapper, Header } from '../../Components';
import { AssetsList, AssetsAUM } from './Components';

const Assets = () => (
  <Wrapper>
    <Header title="All Assets" />
    <Section header>
      <AssetsAUM />
    </Section>
    <Section>
      <AssetsList />
    </Section>
  </Wrapper>
);

export default Assets;
