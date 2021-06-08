import Big from 'big.js';
import { getCookie } from 'utils';

/**
 * Convert a value from one denom to another based on assetMetadata
 * @param {number} value the number that you want to convert
 * @param {string} initialDenom the denom that the value prop is currently in
 * @returns {number}
 */

export const currencyFormat = (value = 0, initialDenom) => {
  // Get the metadata from the cookie set by assetReducer
  const assetMetadata = JSON.parse(getCookie('assetMetadata', true) || '[]');

  // Find the individual denom metadata from the list, if it exists
  const denomInfo = assetMetadata?.find(
    (md) => md.base === initialDenom || md.display === initialDenom
  );

  // If the value isn't a number,
  // the initial and final denoms don't match a known conversion or
  // the initial and final denoms are the same string,
  // just return the value
  if (isNaN(value) || !denomInfo) return value;

  // pull the needed denom info
  const { base, display, denomUnits } = denomInfo;
  // find the exponent from the denom units
  let { exponent } = denomUnits.find(({ denom }) => denom === display);
  // If converting to the base denom invert the exponent
  exponent = initialDenom === base ? exponent * -1 : exponent;

  // return value * 10^exponent
  return new Big(value).times(new Big(10).pow(exponent)).toFixed();
};
