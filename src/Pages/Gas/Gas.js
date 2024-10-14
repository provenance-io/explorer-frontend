import React from 'react';
import { Section, Wrapper } from '../../Components';
import { GasVolume, GasStats } from './Components';

const Gas = () => (
  <Wrapper noHeader>
    <Section>
      <GasStats />
    </Section>
    <Section>
      <GasVolume />
    </Section>
  </Wrapper>
);

export default Gas;
