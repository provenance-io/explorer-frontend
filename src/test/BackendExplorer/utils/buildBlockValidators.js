import { rng, rngHex } from './number';
import { blockUsers } from '../data';

export const buildBlockValidators = () => {
  const buildAmount = rng(25, 100);

  const buildBlockValidator = ({ userName, userId }, index) => ({
    consensus: rngHex(42),
    moniker: userName,
    operatorId: userId,
    proposerPriority: rng(-987654321, 987654321),
    votingPower: rng(1234567, 87654321),
    index: index + 1,
  });
  const blockValidatorsSet = {
    items: [],
    total: buildAmount,
  };
  for (let i = 0; i < buildAmount; i++) {
    const randomBlockUser = blockUsers[rng(0, blockUsers.length - 1)];
    blockValidatorsSet.items.push(buildBlockValidator(randomBlockUser, i));
  }

  return blockValidatorsSet;
};
