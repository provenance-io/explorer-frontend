import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CopyValue } from 'Components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  user-select: none;
`;

const ValidatorHeader = () => {
  const { validatorId } = useParams();

  return (
    <HeaderContainer>
      <Value>{validatorId}</Value>
      <CopyValue
        value={validatorId}
        title="Copy Validator ID"
      />
    </HeaderContainer>
  );
};

export default ValidatorHeader;
