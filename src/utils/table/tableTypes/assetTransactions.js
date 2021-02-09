import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';
import { capitalize } from '../../string/capitalize';

export const assetTransactionsTable = (data) =>
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
        case 'txType':
          finalObj['txtype'] = { value: capitalize(value) };
          break;
        case 'address':
          finalObj['address'] = { value: maxLength(value, 11, 3), link: `/accounts/${value}` };
          break;
        case 'value':
          finalObj['value'] = { value: numberFormat(value, 8) };
          break;
        case 'currency':
          finalObj['currency'] = { value };
          break;
        case 'timestamp':
          finalObj['timestamp'] = { value };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
