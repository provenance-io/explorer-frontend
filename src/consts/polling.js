import { isProd } from 'consts';

export const polling = {
  blockSpotlight: 5000,
  dailyPrice: 90000,
  latestPrice: 300000, // Polled every 5 minutes
  recentBlocks: 10000,
  recentTxs: 30000,
  totalAum: 1000000,
  // Pull every 15 min in prod, 1 min in test
  notifications: isProd ? 900000 : 60000,
};
