import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';

// Validator list has: Moniker, Operator, Commision, Bonded Tokens, Voting Power, Uptime, Self Bonded, Delagators, and Bond Height
export const validatorUnbondingDelegationsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'address':
          finalObj['address'] = {
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
        case 'block':
          finalObj['block'] = { value, link: `/block/${value}` };
          break;
        case 'endTime':
          finalObj['end time'] = { value };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
