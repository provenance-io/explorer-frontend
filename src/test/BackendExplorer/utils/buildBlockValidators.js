import { rng, rngHex } from './number';
import { blockUsers } from '../data';

export const buildBlockValidators = () => {
  const buildAmount = rng(25, 100);

  const buildBlockValidator = ({ userName, userId }, index) => ({
    addressId: userId,
    bondHeight: 0,
    bondedTokens: rng(1_164_360_000, 4_000_000_000),
    bondedTokensDenomination: 'nhash',
    commission: 0.1,
    consensusAddress: rngHex(42),
    delegators: rng(1, 10),
    moniker: userName,
    proposerPriority: rng(-987_654_321, 987_654_321),
    selfBonded: rng(1_234_567, 87_654_321),
    selfBondedDenomination: 'nhash',
    uptime: 100,
    votingPower: rng(1_234_567, 87_654_321),
    votingPowerPercent: rng(0.1, 100),
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
