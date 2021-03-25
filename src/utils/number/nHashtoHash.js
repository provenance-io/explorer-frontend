import { currencyFormat } from './currencyFormat';
import { numberFormat } from './numberFormat';

export const nHashtoHash = (nhash = 0, options = {}) => {
  const { shorthand = true, decimal = 2, decimalMax = 10 } = options;
  // If we don't get a value back just return null
  if (!nhash) return nhash;
  // Convert nhash to hash first
  const hash = currencyFormat(nhash, 'nhash', 'hash');
  // Convert to formatted number with decimal places and optional shorthand
  return numberFormat(hash, decimalMax, { shorthand, minimumFractionDigits: decimal });
};
