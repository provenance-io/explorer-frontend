import { rest } from 'msw';
import { getState } from '../BackendExplorer/context';

export const txs = [
  rest.get(`${process.env.PUBLIC_URL}/txs/all`, (req, res, ctx) => {
    const { url } = req;
    const { txsOrdered, txs } = getState();
    const query = url.searchParams;
    const queryCount = parseInt(query.get('count'));
    const queryPage = parseInt(query.get('page'));
    const queryStatus = parseInt(query.get('status'));
    const queryType = parseInt(query.get('type'));
    const totalTxs = txsOrdered.length;
    const items = [];
    // Initial index to start searching at
    let txsOrderIndex = queryPage * queryCount - queryCount;
    // This API request is asking for a specific count of requests.
    // We already have the requests sorted by date, so we should just look backwards
    // Keep looking and matching against the query params until we hit our target count
    // Stop when we found the count amount or when we've looked through all txs
    while (items.length < queryCount && txsOrderIndex < totalTxs) {
      const txId = txsOrdered[txsOrderIndex];
      const tx = txs[txId];
      const { type: txType, status: txStatus } = tx;
      let match = true;
      // If needed, check against the status
      if (queryStatus && queryStatus !== 'all' && queryStatus.toLowerCase() !== txStatus.toLowerCase()) {
        match = false;
      }
      // If needed, check against the type
      if (queryType && queryType !== 'all' && queryType.toLowerCase() !== txType.toLowerCase()) {
        match = false;
      }
      // Final result, check if it's a match
      if (match) {
        items.push(tx);
      }
      // Move up to the next item index
      txsOrderIndex++;
    }

    const txsData = {
      total: totalTxs,
      items,
    };

    return res(ctx.delay(50), ctx.status(200), ctx.json(txsData));
  }),

  rest.get(`${process.env.PUBLIC_URL}/txs/byDay`, (req, res, ctx) => {
    const { transactionHistory: fullTransactionHistory } = getState();
    // Transaction history passes back the last 30 days, we only want to show [historyCount] amount
    const { url } = req;
    const query = url.searchParams;
    const count = parseInt(query.get('count'));
    // First reverse puts the current day first.  Second reverse shows the data from the latest date first (visually)
    const transactionHistory = fullTransactionHistory.reverse().slice(0, count).reverse();

    return res(ctx.delay(50), ctx.status(200), ctx.json(transactionHistory));
  }),

  rest.get(`${process.env.PUBLIC_URL}/txs/txInfo/:txHash`, (req, res, ctx) => {
    const { params } = req;
    const { txHash } = params;
    const { txs } = getState();
    const targetTx = txs[txHash] || {};

    return res(ctx.delay(50), ctx.status(200), ctx.json(targetTx));
  }),
];
