import { maxLength } from '../../string/maxLength';

export const blockTxsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'txHash':
          finalObj['tx hash'] = {
            value: maxLength(value, 11, 3),
            link: `/tx/${value}`,
          };
          break;
        case 'txType':
          finalObj['tx type'] = { value };
          break;
        case 'fee':
          finalObj['fee'] = { value };
          break;
        case 'signer':
          finalObj['signer'] = {
            value: maxLength(value, 11, 3),
            link: `validator/${value}`,
          };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
