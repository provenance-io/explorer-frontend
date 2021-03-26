import { currencyFormat } from './currencyFormat';
import { numberFormat } from './numberFormat';

export const nHashtoHash = (nhash, options = {}) => {
  // If we start with a value back just return null
  if (!nhash || typeof nhash !== 'number') return nhash;
  const { shorthand = false, decimal = 7 } = options;
  // Convert nhash to hash first
  const hash = currencyFormat(nhash, 'nhash', 'hash');
  // Convert to formatted number with decimal places and optional shorthand
  return numberFormat(hash, decimal, { shorthand });
};
