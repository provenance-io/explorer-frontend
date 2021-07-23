import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import {
  ValidatorCommission,
  ValidatorDelegations,
  ValidatorDelegationTxs,
  ValidatorGovernance,
  ValidatorSpotlight,
  ValidatorUnbondingDelegations,
  ValidationTxs,
} from './Components';

const Validator = () => {
  const { validatorId } = useParams();

  return (
    <Wrapper>
      <Header
        title="Validator Details"
        value={validatorId}
        copyValue={validatorId}
        copyTitle="Copy Validator ID"
      />
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
      <Section>
        <ValidatorGovernance />
      </Section>
    </Wrapper>
  );
};

export default Validator;
