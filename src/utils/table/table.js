import { maxLength } from '../string/maxLength';
import { numberFormat } from '../number/numberFormat';
import { capitalize } from '../string/capitalize';
import {
  transactionsTable,
  validatorsTable,
  blockValidatorsTable,
  assetHoldersTable,
  blocksTable,
  validatorDelegationsTable,
  validatorUnbondingDelegationsTable,
  validatorDelegationTxsTable,
  validatorTxsTable,
  assetTransactionsTable,
  assetsTable,
} from './tableTypes';

// Format tables based on the table type so that they look correct in the UI.
// This like having a link, capitalizing letters, shortening length are all custom per table type
export const formatTableData = (data = [], type) => {
  if (!data.length) return data;
  switch (type) {
    case 'transactions':
      return transactionsTable(data);
    case 'validators':
      return validatorsTable(data);
    case 'validatorDelegations':
      return validatorDelegationsTable(data);
    case 'validatorDelegationTxs':
      return validatorDelegationTxsTable(data);
    case 'validatorTxs':
      return validatorTxsTable(data);
    case 'validatorUnbondingDelegations':
      return validatorUnbondingDelegationsTable(data);
    case 'blockValidators':
      return blockValidatorsTable(data);
    case 'blocks':
      return blocksTable(data);
    case 'assetHolders':
      return assetHoldersTable(data);
    case 'assets':
      return assetsTable(data);
    case 'assetTransactions':
      return assetTransactionsTable(data);
    default:
      return data;
  }
};

// Thought process here: There is a lot of repeating data that I've been cleaning and massaging.
// Why not just look for any of these common values and have a standard format for them.
// If a specific table needs to format the data further or differently they can do so after running this fx.
export const newTableBuilder = (data) =>
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
        case 'balance':
          finalObj[key] = {
            value: numberFormat(value, 2),
          };
          break;
        case 'block': // fallthrough
        case 'blockHeight':
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
          finalObj['fee'] = finalObj[key] || { value: [] };
          finalObj['fee'].value[1] = value;
          break;
        case 'height':
          finalObj[key] = {
            value,
            link: `/block/${value}`,
          };
          break;
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
          finalObj['selfBonded'].value[1] = value;
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
          finalObj[key] = { value: `${value}+UTC` };
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
        case 'txType':
          finalObj[key] = { value: capitalize(value) };
          break;
        case 'type':
          finalObj[key] = {
            value: capitalize(value.replaceAll('_', ' ')),
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
