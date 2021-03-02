import { getUTCTime } from 'utils';
import { rng } from './number';
import { getPastDays } from './date';

// Build out mock x [historyCount] day transactions
export const buildTransactionHistory = (historyCount) => {
  const pastDays = getPastDays(historyCount);
  // dateFull, dateShort, value
  const txHistory = pastDays.map((dateFull) => ({
    dateFull,
    dateShort: getUTCTime(dateFull, 'MMM, dd'),
    value: rng(100, 500),
  }));
  const txHistoryFinal = txHistory.reverse();

  return txHistoryFinal;
};
