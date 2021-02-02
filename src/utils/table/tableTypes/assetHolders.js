import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';

export const assetHoldersTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'rank':
          finalObj['rank'] = {
            value,
          };
          break;
        case 'address':
          finalObj['address'] = {
            value: maxLength(value, 11, 3),
            link: `/address/${value}`,
            hover: value,
          };
          break;
        case 'quantity':
          finalObj['quantity'] = {
            value: numberFormat(value, 2),
          };
          break;
        case 'percentage':
          finalObj['percentage'] = {
            value: `${value}%`,
          };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
