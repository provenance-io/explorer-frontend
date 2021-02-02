import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import {
  ValidatorHeader,
  ValidatorSpotlight,
  ValidatorCommission,
  ValidatorDelegations,
  ValidatorUnbondingDelegations,
  ValidatorDelegationTxs,
  ValidationTxs,
} from './Components';

const Validator = () => (
  <Wrapper>
    <Header title="Validator Details">
      <ValidatorHeader />
    </Header>
    <Section header>
      <ValidatorSpotlight />
    </Section>
    <Section>
      <ValidatorCommission />
    </Section>
    <Section>
      <ValidatorDelegations />
      <ValidatorUnbondingDelegations />
    </Section>
    <Section>
      <ValidatorDelegationTxs />
    </Section>
    <Section>
      <ValidationTxs />
    </Section>
  </Wrapper>
);

export default Validator;
