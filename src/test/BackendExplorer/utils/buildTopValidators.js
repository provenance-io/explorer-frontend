export const buildTopValidators = (allValidators, count) => {
  // Sort all validators by their POWER!
  const sortedValidatorIds = Object.keys(allValidators)
    .sort((idA, idB) => allValidators[idA].power - allValidators[idB].power)
    .reverse();

  return sortedValidatorIds.slice(0, count);
};
