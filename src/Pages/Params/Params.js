import React from 'react';
import { Section, Wrapper } from '../../Components';
import { CosmosParamsList, ProvParamsList } from './Components';

const Params = () => (
  <Wrapper noHeader>
    <Section>
      <CosmosParamsList />
    </Section>
    <Section>
      <ProvParamsList />
    </Section>
  </Wrapper>
);

export default Params;
