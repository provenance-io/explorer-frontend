import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
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
  const { matches } = useMediaQuery(breakpoints.down('sm'));

  const headerValue = matches ? maxLength(validatorId, 20, 3) : validatorId;

  return (
    <Wrapper>
      <Header
        title="Validator Details"
        value={headerValue}
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
