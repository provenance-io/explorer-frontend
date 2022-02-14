import React from 'react';
import { Section, Header, Wrapper } from 'Components';
import { UpgradesList } from './Components';

const Upgrades = () => (
  <Wrapper>
    <Header title="Provenance Upgrade History" />
    <Section>
      <UpgradesList />
    </Section>
  </Wrapper>
);

export default Upgrades;
