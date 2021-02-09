import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';
import { capitalize } from '../../string/capitalize';

export const validatorTxsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'txHash':
          finalObj['txhash'] = {
            value: maxLength(value, 11, 3),
            link: `/tx/${value}`,
          };
          break;
        case 'block':
          finalObj['block'] = { value, link: `/block/${value}` };
          break;
        case 'moniker':
          finalObj['moniker'] = { value };
          break;
        case 'operator':
          finalObj['operator'] = {
            value: maxLength(value, 11, 3),
          };
          break;
        case 'selfBonded':
          finalObj['self bonded'] = finalObj['self bonded'] || { value: [] };
          finalObj['self bonded'].value[0] = numberFormat(value, 2);
          break;
        case 'selfBondedDenomination':
          finalObj['self bonded'] = finalObj['self bonded'] || { value: [] };
          finalObj['self bonded'].value[1] = value;
          break;
        case 'txType':
          finalObj['txtype'] = { value: capitalize(value) };
          break;
        case 'fee':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[0] = numberFormat(value, 6);
          break;
        case 'feeDenomination':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[1] = value;
          break;
        case 'signer':
          finalObj['signer'] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
          };
          break;
        case 'status':
          finalObj['status'] = { value: capitalize(value) };
          break;
        case 'timestamp':
          finalObj['timestamp'] = { value: `${value}+UTC` };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
