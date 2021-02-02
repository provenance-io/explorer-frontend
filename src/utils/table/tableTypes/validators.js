import { maxLength } from '../../string/maxLength';

// Validator list has: Moniker, Operator, Commision, Bonded Tokens, Voting Power, Uptime, Self Bonded, Delagators, and Bond Height
export const validatorsTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'moniker':
          finalObj['moniker'] = {
            value,
            link: `/validator/${dataObj.addressId}`,
          };
          break;
        case 'addressId':
          finalObj['operator'] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/validator/${value}`,
          };
          break;
        case 'commission':
          finalObj['commission'] = { value };
          break;
        case 'bondedTokens':
          finalObj['bonded tokens'] = finalObj['bonded tokens'] || { value: [] };
          finalObj['bonded tokens'].value[0] = value;
          break;
        case 'bondedTokensDenomination':
          finalObj['bonded tokens'] = finalObj['bonded tokens'] || { value: [] };
          finalObj['bonded tokens'].value[1] = ` ${value}`;
          break;
        case 'votingPowerPercent':
          finalObj['voting power'] = { value: `${value} %` };
          break;
        case 'uptime':
          finalObj['uptime'] = { value };
          break;
        case 'selfBonded':
          finalObj['self bonded'] = finalObj['self bonded'] || { value: [] };
          finalObj['self bonded'].value[0] = value;
          break;
        case 'selfBondedDenomination':
          finalObj['self bonded'] = finalObj['self bonded'] || { value: [] };
          finalObj['self bonded'].value[1] = ` ${value}`;
          break;
        case 'delegators':
          finalObj['delegators'] = { value };
          break;
        case 'bondHeight':
          finalObj['bond height'] = { value };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
