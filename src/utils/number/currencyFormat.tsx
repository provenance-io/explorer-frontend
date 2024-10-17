import Big from 'big.js';
import { getCookie } from '../../utils';

export const currencyFormat = (value = 0, initialDenom: string, toBase = false) => {
  // Get the metadata from the cookie set by assetReducer
  let assetMetadata = JSON.parse(getCookie('assetMetadata', true) || '[]');

  if (assetMetadata.length === 0) {
    assetMetadata = window.localStorage.getItem('assetMetadata');
    if (assetMetadata) assetMetadata = JSON.parse(assetMetadata);
  }

  // Find the individual denom metadata from the list, if it exists
  const denomInfo = assetMetadata?.find(
    (md: any) => md.base === initialDenom || (toBase && md.display === initialDenom)
  );

  // If the value isn't a number,
  // the initial and final denoms don't match a known conversion,
  // the initial and final denoms are the same string or
  // the denom units don't exist
  // just return the value
  if (isNaN(value) || !denomInfo || !denomInfo?.denomUnits)
    return { amount: value, denom: initialDenom };

  // pull the needed denom info
  const { base, display, denomUnits } = denomInfo;
  // find the exponent from the denom units
  // Note: There appears to be a bug where one token isn't supplying exponents :shrug:
  // let { exponent } = denomUnits.find(({ denom }: { denom: string }) => denom === display);
  const denom = denomUnits.find(({ denom }: { denom: string }) => denom === display);
  let exponent = denom?.exponent ? denom.exponent : 0;
  // If converting to the base denom invert the exponent
  exponent = toBase ? exponent : exponent * -1;
  // The denom that the new amount is in
  const finalDenom = toBase ? base : display;

  // return value * 10^exponent
  return {
    amount: new Big(value).times(new Big(10).pow(exponent)).toFixed(),
    denom: finalDenom,
  };
};
