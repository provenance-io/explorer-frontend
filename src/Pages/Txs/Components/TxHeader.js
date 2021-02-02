import React from 'react';
import styled from 'styled-components';
import { useApp, useTxs } from 'redux/hooks';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  user-select: none;
`;

const TxHeader = () => {
  const { txsPages } = useTxs();
  const { tableCount } = useApp();
  // The api sends through a page count (tableCount) and returns a total amount of pages
  const txsTotal = txsPages * tableCount;

  return (
    <HeaderContainer>
      <Value>{txsTotal} total</Value>
    </HeaderContainer>
  );
};

export default TxHeader;
