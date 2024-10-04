const IS_PROD =
  window.location.host === 'www.figuremarkets.com' || window.location.host === 'figuremarkets.com';

export const polling = {
  blockSpotlight: 5000,
  dailyPrice: 90000,
  latestPrice: 300000, // Polled every 5 minutes
  recentBlocks: 10000,
  recentTxs: 30000,
  totalAum: 1000000,
  // Pull every 15 min in prod, 1 min in test
  notifications: IS_PROD ? 900000 : 60000,
};
