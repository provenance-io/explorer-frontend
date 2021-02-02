import React from 'react';
import { Wrapper, Section, Header } from 'Components';
import { ValidatorHeader, ValidatorList } from './Components';

const Validators = () => (
  <Wrapper>
    <Header title="Validators List">
      <ValidatorHeader />
    </Header>
    <Section header>
      <ValidatorList />
    </Section>
  </Wrapper>
);

export default Validators;
