// Limit the length of a string
// Optional 'start' prop will cut out the chars at specific starting point (defaults to the end)
// - ex: maxLength('fantastic', 3) => 'fan...';
// - ex: maxLength('fantastic', 3, 2) => 'fa...c'
// - ex: maxLength('fantastic', 6, 1) => 'f...astic'
// - ex: maxLength('fantastic', 6, true) => 'fan...tic'
export const maxLength = (term, length, location = 'end') => {
  if (typeof term !== 'string' && typeof term?.toString === 'function') term = term.toString();
  if (typeof term !== 'string') return '';
  const isNumber = !isNaN(location);
  const isEnd = location === 'end';
  const isStart = location === 'start';
  const locationValid = (isNumber && isNumber > 0 && location <= length) || isEnd || isStart;
  // If the location isn't a valid value do nothing
  if (!locationValid) return term;
  // If the term is shorter than the max, just return it
  if (term.length <= length) return term;
  // Handle slicing somewhere in the term
  if (isNumber) {
    const front = `${term.slice(0, location)}`;
    const flipped = term.split(front)[1].split('').reverse().join('');
    const cutAmount = Math.abs(location - length);
    const backFlipped = `${flipped.slice(0, cutAmount)}`;
    const back = backFlipped.split('').reverse().join('');
    return `${front}...${back}`;
  }
  // Standard length slice (isEnd)
  return `${term.slice(0, length)}...`;
};
