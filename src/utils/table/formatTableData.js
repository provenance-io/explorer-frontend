import { maxLength } from '../string/maxLength';
import { numberFormat } from '../number/numberFormat';
import { capitalize } from '../string/capitalize';

// Thought process here: There is a lot of repeating data that I've been cleaning and massaging.
// Why not just look for any of these common values and have a standard format for them.
// If a specific table needs to format the data further or differently they can do so after running this fx.
export const formatTableData = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        // Not used yet, found within uncreated APIs
        case 'address':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
            hover: value,
          };
          break;
        case 'addressId':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/validator/${value}`,
          };
          break;
        case 'amount': // fallthrough
        case 'balance':
          finalObj[key] = {
            value: numberFormat(value, 2),
          };
          break;
        case 'block': // fallthrough
        case 'blockHeight': // fallthrough
        case 'height':
          finalObj[key] = {
            value,
            link: `/block/${value}`,
          };
          break;
        case 'bondHeight':
          finalObj[key] = { value };
          break;
        case 'bondedTokens':
          finalObj['bondedTokens'] = finalObj['bondedTokens'] || { value: [] };
          finalObj['bondedTokens'].value[0] = numberFormat(value);
          break;
        case 'bondedTokensDenomination':
          finalObj['bondedTokens'] = finalObj['bondedTokens'] || { value: [] };
          finalObj['bondedTokens'].value[1] = ` ${value}`;
          break;
        case 'circulation':
          finalObj[key] = {
            value: numberFormat(value),
          };
          break;
        case 'commission':
          finalObj[key] = { value };
          break;
        case 'consensusAddress':
          finalObj[key] = { value: maxLength(value, 11, 3), hover: value };
          break;
        case 'currency':
          finalObj[key] = { value };
          break;
        case 'delegators':
          finalObj[key] = { value };
          break;
        case 'fee':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[0] = numberFormat(value, 6);
          break;
        case 'denomination': // fallthrough
        case 'feeDenomination':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[1] = ` ${value}`;
          break;
        case 'denom': // fallthrough
        case 'marker':
          finalObj[key] = {
            value,
            link: `/asset/${value}`,
          };
          break;
        case 'moniker':
          finalObj[key] = {
            value,
            link: `/validator/${dataObj?.addressId || dataObj?.ownerAddress}`,
          };
          break;
        case 'operator':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            hover: value,
          };
          break;
        case 'ownerAddress':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
            hover: value,
            copy: value,
          };
          break;
        case 'percentage': {
          const finalValue = value < 0.01 ? '<0.01%' : `${numberFormat(value * 100, 2)}%`;
          finalObj[key] = {
            value: finalValue,
          };
          break;
        }
        case 'price': // fallthrough
        case 'priceChange':
          finalObj[key] = {
            value: numberFormat(value),
          };
          break;
        case 'proposerAddress':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/validator/${value}`,
          };
          break;
        case 'proposerPriority':
          finalObj[key] = { value };
          break;
        case 'selfBonded':
          finalObj['selfBonded'] = finalObj['selfBonded'] || { value: [] };
          finalObj['selfBonded'].value[0] = numberFormat(value, 2);
          break;
        case 'selfBondedDenomination':
          finalObj['selfBonded'] = finalObj['selfBonded'] || { value: [] };
          finalObj['selfBonded'].value[1] = ` ${value}`;
          break;
        case 'signer':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
            hover: value,
          };
          break;
        case 'status':
          finalObj[key] = { value: capitalize(value) };
          break;
        case 'time': // fallthrough
        case 'timestamp':
          finalObj[key] = { value: `${value}+UTC`, raw: value };
          break;
        case 'totalSupply':
          finalObj[key] = {
            value: numberFormat(value),
          };
          break;
        case 'txHash':
          finalObj[key] = {
            value: maxLength(value, 11, 3),
            link: `/tx/${value}`,
            hover: value,
          };
          break;
        case 'txNum':
          finalObj[key] = { value };
          break;
        case 'txType': // fallthrough
        case 'type':
          finalObj[key] = {
            value: capitalize(value),
          };
          break;
        case 'uptime':
          finalObj[key] = { value: `${numberFormat(value)} %` };
          break;
        case 'validatorsNum':
          finalObj['validators'] = finalObj['validators'] || { value: [] };
          finalObj['validators'].value[0] = value;
          finalObj['validators'].value[1] = ' / ';
          break;
        case 'validatorsTotal':
          finalObj['validators'] = finalObj['validators'] || { value: [] };
          finalObj['validators'].value[2] = value;
          break;
        case 'value':
          finalObj[key] = { value: numberFormat(value, 8) };
          break;
        case 'votingPower':
          finalObj[key] = { value: numberFormat(value) };
          break;
        case 'votingPowerPercent':
          finalObj[key] = { value: `${numberFormat(value)} %` };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
