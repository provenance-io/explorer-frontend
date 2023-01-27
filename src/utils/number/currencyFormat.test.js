import { setCookie } from '..//cookie';
import { currencyFormat } from './currencyFormat';

// assetMetadata cookie
Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value:
    'assetMetadata=[{"denomUnits":[{"denom":"cfigure"},{"denom":"figure","exponent":2}],"base":"cfigure","display":"figure"},{"denomUnits":[{"denom":"cfigurelendingomni"},{"denom":"figurelendingomni","exponent":2}],"base":"cfigurelendingomni","display":"figurelendingomni"},{"denomUnits":[{"denom":"cfigureomni"},{"denom":"figureomni","exponent":2}],"base":"cfigureomni","display":"figureomni"},{"denomUnits":[{"denom":"cfigurepayomni"},{"denom":"figurepayomni","exponent":2}],"base":"cfigurepayomni","display":"figurepayomni"},{"denomUnits":[{"denom":"chomepointomni"},{"denom":"homepointomni","exponent":2}],"base":"chomepointomni","display":"homepointomni"},{"denomUnits":[{"denom":"csynergyoneomni"},{"denom":"synergyoneomni","exponent":2}],"base":"csynergyoneomni","display":"synergyoneomni"},{"description":"Hash is the staking token of the Provenance Blockchain","denomUnits":[{"denom":"nhash"},{"denom":"hash","exponent":9}],"base":"nhash","display":"hash"}]',
});

describe('util: currencyFormat', () => {
  it('should return the value if not given a number', () => {
    expect(currencyFormat('abc')).toEqual({ amount: 'abc', denom: undefined });
  });

  it("should return the value if the denom isn't in the metadata", () => {
    expect(currencyFormat(100, 'kitties')).toEqual({ amount: 100, denom: 'kitties' });
  });

  it('should format nhash to hash', () => {
    expect(currencyFormat(1, 'nhash')).toEqual({ amount: '0.000000001', denom: 'hash' });
  });

  it('should format hash to nhash', () => {
    expect(currencyFormat(1, 'hash', true)).toEqual({ amount: '1000000000', denom: 'nhash' });
  });

  it('should format cfigure to figure', () => {
    expect(currencyFormat(1, 'cfigure')).toEqual({ amount: '0.01', denom: 'figure' });
  });

  it('should format figure to cfigure', () => {
    expect(currencyFormat(1, 'figure', true)).toEqual({ amount: '100', denom: 'cfigure' });
  });

  it('should fail gracefully', () => {
    setCookie('assetMetadata', '');
    expect(currencyFormat(1, 'nhash')).toEqual({ amount: 1, denom: 'nhash' });
  });
});
