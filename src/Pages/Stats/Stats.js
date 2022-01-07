import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'Components';
import { Upgrades } from './Components';

const Stats = () => (
  <Wrapper noHeader>
    <Helmet>
      <title>Provenance Blockchain Explorer - Versions</title>
    </Helmet>
    <Section>
      <Upgrades />
    </Section>
  </Wrapper>
);

export default Stats;
