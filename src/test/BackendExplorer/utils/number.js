// Generate a random number min-max, specify rounding (can be an interger to change percision), false/null for no rounding
export const rng = (min, max, round = true) => {
  if (round === true) return Math.round(Math.random() * (max - min) + min);
  if (round) return (Math.random() * (max - min) + min).toPrecision(round);
  return Math.random() * max + min;
};

// Generate a random hex to any length
export const rngHex = (length) => {
  const final = [];
  const hex = '0123456789ABCDEF';
  for (let i = 0; i < length; i++) {
    const randomHexIndex = rng(0, hex.length - 1);
    final.push(hex[randomHexIndex]);
  }
  return final.join('');
};

// Generate a random 64 character hexidecimal string to act as a block id
export const rngBlockId = () => rngHex(64);
export const rngHexId = () => rngHex(64);
