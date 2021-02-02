import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content, Loading, Summary } from 'Components';
import { useParams } from 'react-router-dom';
import { maxLength, getUTCTime } from 'utils';
import { useBlocks } from 'redux/hooks';

const DetailRow = styled.div`
  flex-basis: 100%;
  display: flex;
  align-items: flex-start;
  word-break: break-all;
  margin: 10px 0;
`;
const DetailTitle = styled.div`
  min-width: 200px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
`;

const BlockDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const [localBlockHeight, setLocalBlockHeight] = useState('');
  const { blockHeight } = useParams();
  const { blockInfo, getBlockInfo, blockHeight: globalBlockHeight, blockInfoLoading } = useBlocks();

  const blockHeightValid = blockHeight <= globalBlockHeight;

  useEffect(() => {
    // Not loaded, blockHeight exists, and blockHeight is a number
    if (!loaded && blockHeight && !isNaN(blockHeight) && blockHeightValid) {
      getBlockInfo(blockHeight);
      setLocalBlockHeight(blockHeight);
      setLoaded(true);
    }
  }, [getBlockInfo, loaded, setLoaded, blockHeight, blockHeightValid]);

  useEffect(() => {
    // Loaded already, but the blockHeight has been changed
    if (loaded && blockHeight !== localBlockHeight && blockHeightValid) {
      getBlockInfo(blockHeight);
      setLocalBlockHeight(blockHeight);
    }
  }, [blockHeight, getBlockInfo, loaded, setLocalBlockHeight, localBlockHeight, blockHeightValid]);

  const {
    hash = '[N/A]',
    proposerAddress,
    votingPower = 0,
    txNum = '[N/A]',
    numValidators,
    totalValidators = '[N/A]',
    inflation = '[N/A]',
    time,
    denomination = '[N/A]',
    userName,
  } = blockInfo;

  const utcTime = getUTCTime(time);

  const summaryData = [
    { title: 'Block Hash', value: hash, copy: hash },
    {
      title: 'Proposer',
      value: userName || maxLength(proposerAddress, 20, 5),
      link: `/validator/${proposerAddress}`,
      copy: proposerAddress,
    },
    { title: 'Validators', value: `${numValidators} / ${totalValidators}` },
    { title: 'Voting Power', value: votingPower },
    { title: 'Transactions', value: txNum },
    { title: 'Inflation', value: `${inflation} ${denomination}` },
    { title: 'Timestamp', value: `${utcTime}+UTC` },
  ];

  return (
    <Content size="100%">
      {blockInfoLoading ? (
        <Loading />
      ) : (
        <>
          {blockHeightValid ? (
            <Summary data={summaryData} />
          ) : (
            <DetailRow>
              <DetailTitle>Block {blockHeight} does not exist</DetailTitle>
            </DetailRow>
          )}
        </>
      )}
    </Content>
  );
};

export default BlockDetails;
