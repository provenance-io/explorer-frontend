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

const TxHeader = () => {
  const { assetId } = useParams();

  return (
    <HeaderContainer>
      <Value title={assetId}>{assetId}</Value>
      <CopyValue value={assetId} title={`Copy Asset Name ${assetId}`} />
    </HeaderContainer>
  );
};

export default TxHeader;
