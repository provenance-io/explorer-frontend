import React, { useEffect, useState } from 'react';
import { Content, Loading, Summary } from 'Components';
import { useParams } from 'react-router-dom';
import { maxLength, getUTCTime, numberFormat } from 'utils';
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

  const { hash, proposerAddress, moniker, votingPower = {}, txNum, validatorCount = {}, time, userName } = blockInfo;
  const { count: votingPowerCount, total: votingPowerTotal } = votingPower;
  const { count: validatorCountAmount, total: validatorCountTotal } = validatorCount;
  const utcTime = getUTCTime(time);
  const votingPowerPercent = numberFormat((votingPowerCount / votingPowerTotal) * 100, 2);

  const summaryData = [
    { title: 'Block Hash', value: hash, copy: hash },
    {
      title: 'Proposer',
      value: userName || maxLength(moniker, 20, 5),
      link: `/validator/${proposerAddress}`,
      copy: proposerAddress,
    },
    { title: 'Validators', value: `${validatorCountAmount} / ${validatorCountTotal}` },
    { title: 'Voting Power', value: `${numberFormat(votingPowerPercent, 2)}%` },
    { title: 'Transactions', value: txNum },
    { title: 'Timestamp', value: `${utcTime}+UTC` },
  ];

  return <Content size="100%">{blockInfoLoading ? <Loading /> : <Summary data={summaryData} />}</Content>;
};

export default BlockDetails;
