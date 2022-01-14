import React from 'react';
import { Section, Header, Wrapper } from 'Components';
import { Upgrades } from './Components';

const Stats = () => (
  <Wrapper>
    <Header title="Provenance Blockchain Statistics - Versions" />
    <Section>
      <Upgrades />
    </Section>
  </Wrapper>
);

export default Stats;
