import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';

export const assetHoldersTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'ownerAddress':
          finalObj['address'] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
            hover: value,
          };
          break;
        case 'balance':
          finalObj['quantity'] = {
            value: numberFormat(value, 2),
          };
          break;
        case 'percentage': {
          const finalValue = value < 0.01 ? '<0.01%' : `${numberFormat(value * 100, 2)}%`;
          finalObj['percentage'] = {
            value: finalValue,
          };
          break;
        }
        default:
          break;
      }
    });

    return finalObj;
  });
