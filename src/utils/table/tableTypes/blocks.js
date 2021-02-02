import { maxLength } from '../../string/maxLength';

// Validator list has: Moniker, Operator, Commision, Bonded Tokens, Voting Power, Uptime, Self Bonded, Delagators, and Bond Height
export const blocksTable = (data) =>
  data.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];

      switch (key) {
        case 'height':
          finalObj['block'] = {
            value,
            link: `/block/${value}`,
          };
          break;
        case 'proposerAddress':
          finalObj['proposer'] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/validator/${value}`,
          };
          break;
        case 'txNum':
          finalObj['transactions'] = { value };
          break;
        case 'validatorsNum':
          finalObj['validators'] = finalObj['validators'] || { value: [] };
          finalObj['validators'].value[0] = value;
          finalObj['validators'].value[1] = ' / ';
          break;
        case 'validatorsTotal':
          finalObj['validators'] = finalObj['validators'] || { value: [] };
          finalObj['validators'].value[2] = value;
          break;
        case 'votingPower':
          finalObj['voting power'] = { value: `${value}%` };
          break;
        case 'time':
          finalObj['timestamp'] = { value };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
