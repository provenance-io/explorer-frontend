import { maxLength } from '../../string/maxLength';
import { capitalize } from '../../string/capitalize';

export const transactionsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'txHash':
          finalObj['tx hash'] = {
            value: maxLength(value, 11, 5),
            link: `/tx/${value}`,
            hover: value,
          };
          break;
        case 'blockHeight':
          finalObj['block'] = {
            value,
            link: `/block/${value}`,
          };
          break;
        case 'type':
          finalObj['tx type'] = {
            value: capitalize(value.replaceAll('_', ' ')),
          };
          break;
        case 'signer':
          finalObj['signer'] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/accounts/${value}`,
          };
          break;
        case 'time':
          finalObj['timestamp'] = { value };
          break;
        case 'fee':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[0] = value;
          break;
        case 'denomination':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[1] = ` ${value}`;
          break;
        case 'status':
          finalObj['status'] = { value: capitalize(value) };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
