import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getUTCTime } from 'utils';
import { Link } from 'react-router-dom';
import { useInterval, useBlocks, useMediaQuery } from 'redux/hooks';
import { Content, TimeTicker, Loading } from 'Components';
import { polling, breakpoints } from 'consts';

const RecentBlocksWrapper = styled.div`
  margin-top: 22px;
  flex-basis: 100%;
`;
const BlockLineContainer = styled.div`
  flex-basis: 100%;
  border-top: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
`;
const BlockLineRow = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const RecentBlocks = () => {
  const [blocksLoading, setBlocksLoading] = useState(false);
  const { getBlocksRecent, blocks, recentBlocksCount } = useBlocks();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('md'));

  const totalBlocks = blocks.length;
  // Poll the API for new data every 10s
  useInterval(() => getBlocksRecent({ count: recentBlocksCount }), polling.recentBlocks);
  // Initial load, get most recent blocks
  useEffect(() => {
    setBlocksLoading(true);
    // Get initial blocks
    getBlocksRecent({ count: recentBlocksCount })
      .then(() => setBlocksLoading(false))
      .catch(() => setBlocksLoading(false));
  }, [getBlocksRecent, setBlocksLoading, recentBlocksCount]);

  const buildBlockLines = () =>
    blocks.map(({ txNum, height, time }) => {
      const utcTime = time ? getUTCTime(time) : '--';

      return (
        <BlockLineContainer key={height}>
          <BlockLineRow>
            <Link to={`/block/${height}`}>{height}</Link>
            <TimeTicker timestamp={utcTime} />
          </BlockLineRow>
          <BlockLineRow>
            <div>Transactions: {txNum}</div>
            <div>{utcTime}+UTC</div>
          </BlockLineRow>
        </BlockLineContainer>
      );
    });

  return (
    <Content
      alignSelf="flex-start"
      size={isSmall ? '100%' : '50%'}
      icon="APPS"
      title={totalBlocks > 0 ? `${totalBlocks} Most Recent Blocks` : 'Most Recent Blocks'}
      link={{ to: '/blocks', title: 'View All' }}
    >
      {blocksLoading ? (
        <Loading />
      ) : totalBlocks > 0 ? (
        <RecentBlocksWrapper>{buildBlockLines()}</RecentBlocksWrapper>
      ) : (
        <div>No recent blocks available</div>
      )}
    </Content>
  );
};

export default RecentBlocks;
