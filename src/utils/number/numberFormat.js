export const numberFormat = (rawValue, digits = -1, type = 'number', extraOptions = {}) => {
  const value = typeof rawValue === 'string' ? Number(rawValue) : rawValue;

  const options = {};
  // Possible types are number (default) and currency
  if (type === 'currency') {
    options.style = 'currency';
    options.currency = 'USD';
  }
  // Amount of significant digits to return in string
  if (digits >= 0) {
    options.minimumFractionDigits = digits;
    options.maximumFractionDigits = digits;
  }

  return value.toLocaleString('en-US', { ...options, ...extraOptions });
};
