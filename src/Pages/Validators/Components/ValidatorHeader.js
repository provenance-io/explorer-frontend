import React from 'react';
import styled from 'styled-components';
import { useValidators, useApp } from 'redux/hooks';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  user-select: none;
`;

const ValidatorHeader = () => {
  const { validatorsPages, validators } = useValidators();
  const { validatorCount } = useApp();

  // Do we have more than one page?  If so, calculate the total
  const validatorsTotal = validatorsPages > 1 ? validatorsPages * validatorCount : validators.length;

  return (
    <HeaderContainer>
      <Value>{validatorsTotal} total</Value>
    </HeaderContainer>
  );
};

export default ValidatorHeader;
