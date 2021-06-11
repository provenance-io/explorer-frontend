import Big from 'big.js';
import { getCookie } from 'utils';

/**
 * Convert a value from one denom to another based on assetMetadata
 * @param {number} value the number that you want to convert
 * @param {string} initialDenom the denom that the value prop is currently in
 * @param {boolean} toBase whether or not to format back to the base denom (should be very rare)
 * @returns {number}
 */

export const currencyFormat = (value = 0, initialDenom, toBase = false) => {
  // Get the metadata from the cookie set by assetReducer
  const assetMetadata = JSON.parse(getCookie('assetMetadata', true) || '[]');

  // Find the individual denom metadata from the list, if it exists
  const denomInfo = assetMetadata?.find(
    (md) => md.base === initialDenom || (toBase && md.display === initialDenom)
  );

  // If the value isn't a number,
  // the initial and final denoms don't match a known conversion or
  // the initial and final denoms are the same string,
  // just return the value
  if (isNaN(value) || !denomInfo) return { amount: value, denom: initialDenom };

  // pull the needed denom info
  const { base, display, denomUnits } = denomInfo;
  // find the exponent from the denom units
  let { exponent } = denomUnits.find(({ denom }) => denom === display);
  // If converting to the base denom invert the exponent
  exponent = toBase ? exponent : exponent * -1;
  // The denom that the new amount is in
  const finalDenom = toBase ? base : display;

  // return value * 10^exponent
  return {
    amount: new Big(value).times(new Big(10).pow(exponent)).toFixed(),
    denom: finalDenom,
  };
};
