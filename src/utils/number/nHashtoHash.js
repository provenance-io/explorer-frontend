import { numberFormat } from './numberFormat';

export const formatNhash = (nhash, options = {}) => {
  // If there is no value, kick it back
  if (!nhash) return nhash;
  const isNumber = typeof nhash !== 'number';
  const isString = typeof nhash !== 'string';
  // If it's not a number or string kick it back
  if (!isNumber && !isString) return nhash;
  // If nhash is given as a string, convert it to a number
  // const nhashFinal = isString ? Number(nhash) : nhash;
  const { shorthand = false, decimal = 7 } = options;
  // Convert to formatted number with decimal places and optional shorthand
  return numberFormat(nhash, decimal, { shorthand });
};
