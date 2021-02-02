import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Sprite } from 'Components';

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const SearchLoading = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  svg {
    animation: ${rotateAnimation} 2s linear infinite;
  }
`;

const Loading = () => (
  <SearchLoading>
    <Sprite icon="IN_PROGRESS" size="5rem" />
  </SearchLoading>
);

export default Loading;
