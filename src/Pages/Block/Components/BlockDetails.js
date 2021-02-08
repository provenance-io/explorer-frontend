import React, { useEffect, useState } from 'react';
import { Content, Loading, Summary } from 'Components';
import { useParams } from 'react-router-dom';
import { maxLength, getUTCTime } from 'utils';
import { useBlocks } from 'redux/hooks';

const BlockDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const [localBlockHeight, setLocalBlockHeight] = useState('');
  const { blockHeight } = useParams();
  const { blockInfo, getBlockInfo, blockInfoLoading } = useBlocks();

  useEffect(() => {
    // Not loaded, blockHeight exists, and blockHeight is a number
    if (!loaded && blockHeight && !isNaN(blockHeight)) {
      getBlockInfo(blockHeight);
      setLocalBlockHeight(blockHeight);
      setLoaded(true);
    }
  }, [getBlockInfo, loaded, setLoaded, blockHeight]);

  useEffect(() => {
    // Loaded already, but the blockHeight has been changed
    if (loaded && blockHeight !== localBlockHeight) {
      getBlockInfo(blockHeight);
      setLocalBlockHeight(blockHeight);
    }
  }, [blockHeight, getBlockInfo, loaded, setLocalBlockHeight, localBlockHeight]);

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

  return <Content size="100%">{blockInfoLoading ? <Loading /> : <Summary data={summaryData} />}</Content>;
};

export default BlockDetails;
