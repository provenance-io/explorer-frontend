// This is a primitive way to format, todo: update this util
export const currencyFormat = (value, initialDenom, finalDenom, format = true) => {
  // nhash to hash
  // 1 nhash = 1 x 10^-9 hash ===> 1,000,000 nhash = .1 hash | 12,345,678,987,654,320 nhash = 12,345,678,.987654320 hash
  if (initialDenom === 'nhash' && finalDenom === 'hash') return format ? value / 1e9 : value / 1e9;
  // hash to nhash
  // 1 hash = 1 x 10^9 nhash ===> .1 hash = 1,000,000 nhash | 12,345,678 hash = 12,345,678,000,000,000 nhash
  if (initialDenom === 'nhash' && finalDenom === 'hash') return format ? value / 1e-9 : value / 1e-9;
  // Initial and final denoms don't match to known conversion, just return the value
  return format ? value : value;
};
