import React from 'react';
import { Section, Wrapper } from 'Components';
import { NameTreeChart } from './Components';

export const NameTree = () => (
  <Wrapper noHeader>
    <Section>
      <NameTreeChart />
    </Section>
  </Wrapper>
);