import { maxLength } from '../../string/maxLength';
import { numberFormat } from '../../number/numberFormat';
// ['Name', 'Market Cap (USD)', 'Price (USD)', 'Supply', 'Owner'];
export const assetsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'marker':
          finalObj['name'] = {
            value,
            link: `/asset/${value}`,
          };
          break;
        case 'ownerAddress':
          finalObj['owner'] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
            copy: value,
            hover: value,
          };
          break;
        case 'totalSupply': {
          finalObj['supply'] = {
            value: numberFormat(value),
          };
          break;
        }
        case 'circulation': {
          finalObj['market cap (usd)'] = {
            value: numberFormat(value),
          };
          break;
        }
        case 'price': {
          finalObj['price (usd)'] = {
            value: numberFormat(value),
          };
          break;
        }
        case 'priceChange': {
          finalObj['priceChange'] = {
            value: numberFormat(value),
          };
          break;
        }
        default:
          break;
      }
    });

    return finalObj;
  });
