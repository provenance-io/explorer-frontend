import { getUTCTime } from 'utils';
import store from 'redux/store';
import { rng, rngHexId } from './number';
import { txTypes, txStatus, blockUsers } from '../data';

// Make the first tx always the same hash value so it's easier to develop (can refresh page while editing)
const initialTx = (time) => ({
  blockHeight: 8675309,
  codespace: null,
  denomination: 'vspn',
  errorCode: null,
  fee: rng(0.01, 0.09, 3),
  signer: blockUsers[rng(0, blockUsers.length - 1)].userId,
  status: txStatus[rng(0, txStatus.length - 1)],
  time,
  txHash: '8675309C411J3NNYT0D4Y',
  type: txTypes[rng(0, txTypes.length - 1)],
});

export const buildNewTx = ({ txs, blocksRecent }) => {
  const currentTxIndex = Object.keys(txs).length + 1;

  const currentUTCTime = getUTCTime();

  // Always have the same first Tx (will make editing much much easier)
  return currentTxIndex === 1
    ? initialTx(currentUTCTime)
    : {
        blockHeight: blocksRecent[rng(0, blocksRecent.length - 1)],
        codespace: null,
        denomination: 'vspn',
        errorCode: null,
        fee: rng(0.01, 0.09, 3),
        signer: blockUsers[rng(0, blockUsers.length - 1)].userId,
        status: txStatus[rng(0, txStatus.length - 1)],
        time: currentUTCTime,
        txHash: rngHexId(),
        type: txTypes[rng(0, txTypes.length - 1)],
      };
};
