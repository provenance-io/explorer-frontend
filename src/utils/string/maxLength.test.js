import { maxLength } from './maxLength';

describe('util: maxLength', () => {
  it('should return a string with ellipsis in it', () => {
    expect(maxLength('fantastic', 3)).toBe('fan...');
    expect(maxLength('fantastic', 3, 2)).toBe('fa...c');
    expect(maxLength('fantastic', 6, 1)).toBe('f...astic');
    expect(maxLength('fantastic', 6, 3)).toBe('fan...tic');

    // Seems like one of these should change the output...
    // TODO: Ask @vig about it
    expect(maxLength('fantastic', 6, 'start')).toBe('fantas...');
    expect(maxLength('fantastic', 6, 'end')).toBe('fantas...');
  });

  it('should support numbers', () => {
    expect(maxLength(12345678, 3)).toBe('123...');
    expect(maxLength(12345678, 6, 3)).toBe('123...678');
  });
});
