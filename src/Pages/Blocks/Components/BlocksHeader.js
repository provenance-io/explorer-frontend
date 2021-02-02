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
  const { blockHeight } = useBlocks();

  return (
    <HeaderContainer>
      <Value>Current Height: {blockHeight === '' ? 'N/A' : <Link to={`/block/${blockHeight}`}>{blockHeight}</Link>}</Value>
    </HeaderContainer>
  );
};

export default Blocks;
