import { currencyFormat } from './currencyFormat';
import { numberFormat } from './numberFormat';

/**
 * Format currency based on amount and denom (base -> display only)
 * @param {number} amount the amount of currency to format
 * @param {string} denom the denom name to format
 * @param {Object} options options to send to `toLocaleString`
 * @returns {string}
 */
export const formatDenom = (amount, denom, options = {}) => {
  // If there is no value, kick it back
  if (!amount) return amount;
  const isNumber = typeof amount !== 'number';
  const isString = typeof amount !== 'string';
  // If it's not a number or string kick it back
  if (!isNumber && !isString) return amount;
  // If nhash is given as a string, convert it to a number
  // const nhashFinal = isString ? Number(nhash) : nhash;
  const { amount: finalAmount, denom: finalDenom } = currencyFormat(amount, denom);
  const { shorthand = false, decimal = 7 } = options;
  // Convert to formatted number with decimal places and optional shorthand
  return `${numberFormat(finalAmount, decimal, { shorthand })} ${finalDenom}`;
};
