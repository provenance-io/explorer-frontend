import { getUTCTime } from 'utils';
import store from 'redux/store';
import { rng, rngHexId } from './number';
import { txTypes, txStatus, blockUsers } from '../data';

// Make the first tx always the same hash value so it's easier to develop (can refresh page while editing)
const initialTx = (time) => ({
  time,
  status: txStatus[rng(0, txStatus.length - 1)],
  currency: 'IRIS',
  gas: {
    currency: 'NANO',
    used: rng(0.01, 0.1, 3),
    price: rng(0.01, 0.1, 3),
    wanted: rng(0.01, 0.1, 3),
    limit: rng(0.01, 0.1, 3),
  },
  txId: '8675309C411J3NNYT0D4Y',
  fee: rng(0.01, 0.09, 3),
  type: txTypes[rng(0, txTypes.length - 1)],
  index: 1,
  block: 8675309,
  memo: rng(10000, 100000),
  signer: blockUsers[rng(0, blockUsers.length - 1)].userId,
  to: blockUsers[rng(0, blockUsers.length - 1)].userId,
  from: blockUsers[rng(0, blockUsers.length - 1)].userId,
  amount: rng(1, 800, 6),
});

export const buildNewTx = ({ txs, blocksRecent }) => {
  const currentTxIndex = Object.keys(txs).length + 1;

  const currentUTCTime = getUTCTime();

  // Always have the same first Tx (will make editing much much easier)
  return currentTxIndex === 1
    ? initialTx(currentUTCTime)
    : {
        block: blocksRecent[rng(0, blocksRecent.length - 1)],
        time: currentUTCTime,
        currency: 'IRIS',
        txId: rngHexId(),
        gas: {
          currency: 'NANO',
          used: rng(0.01, 0.1, 3),
          price: rng(0.01, 0.1, 3),
          wanted: rng(0.01, 0.1, 3),
          limit: rng(0.01, 0.1, 3),
        },
        status: txStatus[rng(0, txStatus.length - 1)],
        fee: rng(0.01, 0.09, 3),
        type: txTypes[rng(0, txTypes.length - 1)],
        index: currentTxIndex,
        memo: rng(10000, 100000),
        signer: blockUsers[rng(0, blockUsers.length - 1)].userId,
        amount: rng(1, 800, 6),
        to: blockUsers[rng(0, blockUsers.length - 1)].userId,
        from: blockUsers[rng(0, blockUsers.length - 1)].userId,
      };
};
