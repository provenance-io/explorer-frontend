import { getUTCTime } from 'utils';
import { rng, rngBlockId } from './number';
import { blockUsers } from '../data';

export const buildNewBlock = ({ blockHeight }) => {
  const currentUTCTime = getUTCTime();
  const rngVotingPower = rng(50, 100);
  const { userName, userId, image } = blockUsers[rng(0, blockUsers.length - 1)];
  const newBlockHeight = blockHeight + 1;
  const newBlock = {
    blockHash: rngBlockId(),
    proposer: { userName, userId, image },
    blockHeight: newBlockHeight,
    validators: `${rngVotingPower} / 100`,
    votingPower: ((rngVotingPower / 100) * 100).toPrecision(6),
    transactions: rng(0, 3),
    inflation: rng(3, 15, false),
    timestamp: currentUTCTime,
    currency: 'IRIS',
    bondedTotal: 2.0,
    bondedAmount: (666 + rng(75, 100, false)).toPrecision(5),
    bondedPercent: rng(30, 95, 4),
    avgBlockTime: rng(3, 9, 3),
    txs: (150 + rng(2, 10, false)).toPrecision(5),
  };

  return newBlock;
};
