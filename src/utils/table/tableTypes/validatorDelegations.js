import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';

// Validator list has: Moniker, Operator, Commision, Bonded Tokens, Voting Power, Uptime, Self Bonded, Delagators, and Bond Height
export const validatorDelegationsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'address':
          finalObj['address'] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
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
        case 'shares':
          finalObj['shares'] = finalObj['shares'] || { value: [] };
          finalObj['shares'].value[0] = numberFormat(value, 4);
          break;
        case 'sharesPercent':
          finalObj['shares'] = finalObj['shares'] || { value: [] };
          finalObj['shares'].value[1] = ` (${numberFormat(value, 4)}%)`;
          break;
        case 'block':
          finalObj['block'] = { value, link: `/block/${value}` };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
