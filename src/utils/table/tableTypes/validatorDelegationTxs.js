import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';
import { capitalize } from '../../string/capitalize';

// Validator list has: Moniker, Operator, Commision, Bonded Tokens, Voting Power, Uptime, Self Bonded, Delagators, and Bond Height
export const validatorDelegationTxsTable = (data) =>
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
        case 'from':
          finalObj['from'] = {
            value: maxLength(value, 11, 3),
            link: `/address/${value}`,
          };
          break;
        case 'amount':
          finalObj['amount'] = finalObj['amount'] || { value: [] };
          finalObj['amount'].value[0] = numberFormat(value, 2);
          break;
        case 'amountDenomination':
          finalObj['amount'] = finalObj['amount'] || { value: [] };
          finalObj['amount'].value[1] = ` ${value}`;
          break;
        case 'to':
          finalObj['to'] = {
            value: maxLength(value, 11, 3),
            link: `/address/${value}`,
          };
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
            link: `/address/${value}`,
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
