import { rng, rngHexId } from './number';
import { blockUsers } from '../data';

export const buildNewValidator = () => {
  const allUsers = {};
  blockUsers.forEach((user) => {
    allUsers[user.userId] = {
      ...user,
      power: rng(300000, 2000000),
      uptime: rng(1, 80, 4),
      missedBlocks: rng(0, 5),
      totalBlocks: rng(500, 40000),
      bondHeight: rng(10000, 30000),
      pubkey: rngHexId(),
    };
  });

  return allUsers;
};
