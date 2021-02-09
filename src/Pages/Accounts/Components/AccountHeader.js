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

const AccountHeader = () => {
  const { addressId } = useParams();

  return (
    <HeaderContainer>
      <Value>{addressId}</Value>
      <CopyValue value={addressId} title="Copy Address" />
    </HeaderContainer>
  );
};

export default AccountHeader;
