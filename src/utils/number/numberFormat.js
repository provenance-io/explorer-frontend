export const numberFormat = (rawValue, digits = 1, extraOptions = {}) => {
  // If we don't have a value to start with just return it
  if (rawValue === null || rawValue === undefined || rawValue === '' || rawValue === '--')
    return rawValue;

  // If we just want to shorthand a number, don't bother with other calculations
  // Eg: numberFormat(1245, 3, { shorthand: true }) => 1.24K
  // Eg: numberFormat(1245000, 3, { shorthand: true }) => 1.24M
  // Eg: numberFormat(1245000000, 3, { shorthand: true }) => 1.24B
  if (extraOptions.shorthand) {
    let letter = ''; // Under Thousand
    let roundedValue = rawValue;
    const trillion = 1e12;
    const billion = 1e9;
    const million = 1e6;
    const thousand = 1e3;
    if (rawValue >= trillion) {
      letter = 'T';
      roundedValue = rawValue / trillion;
    } else if (rawValue >= billion) {
      letter = 'B';
      roundedValue = rawValue / billion;
    } else if (rawValue >= million) {
      letter = 'M';
      roundedValue = rawValue / million;
    } else if (rawValue >= thousand) {
      letter = 'K';
      roundedValue = rawValue / thousand;
    }
    const finalValue = roundedValue.toLocaleString('en-US', { maximumFractionDigits: digits });
    return `${finalValue}${letter}`;
  }

  // If we get a string, convert it to a number
  const value = typeof rawValue === 'string' ? Number(rawValue) : rawValue;

  const options = {};
  // Amount of significant digits to return in string
  if (typeof digits === 'number' && digits >= 0) {
    options.maximumFractionDigits = digits;
    options.minimumFractionDigits = 2;
  }

  return value.toLocaleString('en-US', { ...options, ...extraOptions });
};
