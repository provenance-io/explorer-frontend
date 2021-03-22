export const numberFormat = (rawValue, digits = -1, type = 'number', extraOptions = {}) => {
  // If we don't have a value to start with just return it
  if (rawValue === null || rawValue === undefined || rawValue === '') return rawValue;

  // If we get a string, convert it to a number
  const value = typeof rawValue === 'string' ? Number(rawValue) : rawValue;

  const options = {};
  // Possible types are number (default) and currency
  if (type === 'currency') {
    options.style = 'currency';
    options.currency = 'USD';
  }
  // Amount of significant digits to return in string
  if (digits >= 0) {
    options.maximumFractionDigits = digits;
  }

  return value.toLocaleString('en-US', { ...options, ...extraOptions });
};
