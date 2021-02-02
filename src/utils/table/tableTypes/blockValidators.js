import { maxLength } from '../../string/maxLength';

// Validator list has: Moniker, Operator, Commision, Bonded Tokens, Voting Power, Uptime, Self Bonded, Delagators, and Bond Height
export const blockValidatorsTable = (data) =>
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
        case 'consensusAddress':
          finalObj['consensus address'] = { value: maxLength(value, 11, 3), hover: value };
          break;
        case 'proposerPriority':
          finalObj['proposer priority'] = { value };
          break;
        case 'votingPower':
          finalObj['voting power'] = { value };
          break;
        default:
          break;
      }
    });

    return finalObj;
  });
