import { getUTCTime } from 'utils';
import { rng } from './number';
import { blockUsers } from '../data';

export const buildNewBlock = ({ blockHeight }) => {
  const currentUTCTime = getUTCTime();
  const rngVotingPower = rng(50, 100);
  const { userName, userId, image } = blockUsers[rng(0, blockUsers.length - 1)];
  const newBlockHeight = blockHeight + 1;
  const newBlock = {
    height: newBlockHeight,
    proposerAddress: `${userName}${userId}${image}`,
    time: currentUTCTime,
    txNum: (150 + rng(2, 10, false)).toPrecision(5),
    validatorsNum: `${rngVotingPower} / 100`,
    validatorsTotal: `${rngVotingPower} / 100`,
    votingPower: ((rngVotingPower / 100) * 100).toPrecision(6),
  };

  return newBlock;
};
