import Big from 'big.js';

export const currencyFormat = (value = 0, initialDenom, finalDenom) => {
  if (isNaN(value)) return value;
  // nhash to hash
  // 1 nhash = 1 x 10^-9 hash ===> 1,000,000 nhash = .1 hash | 12,345,678,987,654,320 nhash = 12,345,678,.987654320 hash
  if (initialDenom === 'nhash' && finalDenom === 'hash') return new Big(value).times(new Big(10).pow(-9)).toFixed();

  // hash to nhash
  // 1 hash = 1 x 10^9 nhash ===> .1 hash = 1,000,000 nhash | 12,345,678 hash = 12,345,678,000,000,000 nhash
  if (initialDenom === 'hash' && finalDenom === 'nhash') return new Big(value).times(new Big(10).pow(9)).toFixed();

  // Initial and final denoms don't match to known conversion, just return the value
  return value;
};
