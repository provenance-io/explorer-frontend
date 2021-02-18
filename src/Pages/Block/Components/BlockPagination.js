import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Sprite } from 'Components';
import { useHistory, useParams } from 'react-router-dom';
import { useBlocks } from 'redux/hooks';

const BlockPaginationContainer = styled.div`
  display: flex;
`;
const PaginationButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  ${({ isDisabled }) => isDisabled && 'cursor: not-allowed;'}
`;
const PaginationValue = styled.div`
  user-select: none;
  margin: 0 10px;
`;

const BlockPagination = () => {
  const { getBlocksHeight, blocksHeight: globalBlockHeight } = useBlocks();
  const { blockHeight: pageBlockHeight } = useParams();

  // Whenever the pageBlockHeight changes (user clicks next arrow) get the latest global block height
  useEffect(() => {
    // Run the first time to get the latest block (for latest block height)
    getBlocksHeight();
  }, [pageBlockHeight, getBlocksHeight]);

  const history = useHistory();
  // Need to convert the pageBlockHeight into a number (when pulling from params it's a string)
  const pageBlockHeightNum = parseInt(pageBlockHeight);
  const forwardAllowed = pageBlockHeightNum < globalBlockHeight;
  const backAllowed = pageBlockHeightNum > 1;

  const handleClick = (direction) => {
    const nextHeight = direction === 'back' ? pageBlockHeightNum - 1 : pageBlockHeightNum + 1;
    history.push(`/block/${nextHeight}`);
  };

  return (
    <BlockPaginationContainer>
      <PaginationButton isDisabled={!backAllowed} onClick={() => backAllowed && handleClick('back')}>
        <Sprite icon="CHEVRON" size="1.3rem" color={backAllowed ? 'ICON_PRIMARY' : 'ICON_DISABLED'} />
      </PaginationButton>
      <PaginationValue>{pageBlockHeightNum}</PaginationValue>
      <PaginationButton isDisabled={!forwardAllowed} onClick={() => forwardAllowed && handleClick('forward')}>
        <Sprite icon="CHEVRON" size="1.3rem" spin="180" color={forwardAllowed ? 'ICON_PRIMARY' : 'ICON_DISABLED'} />
      </PaginationButton>
    </BlockPaginationContainer>
  );
};

export default BlockPagination;
