import React from 'react';
import styled from 'styled-components';
import { useBlocks } from 'redux/hooks';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  user-select: none;
`;

const Blocks = () => {
  const { currentHeight } = useBlocks();

  return (
    <HeaderContainer>
      <Value>Current Height: {currentHeight === '' ? 'N/A' : <Link to={`/block/${currentHeight}`}>{currentHeight}</Link>}</Value>
    </HeaderContainer>
  );
};

export default Blocks;
