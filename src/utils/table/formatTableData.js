import { maxLength } from '../string/maxLength';
import { numberFormat } from '../number/numberFormat';
import { formatDenom } from '../number/formatDenom';
import { capitalize } from '../string/capitalize';
import { getUTCTime } from '../date/getUTCTime';

// Thought process here: There is a lot of repeating data that we've been cleaning and massaging.
// Why not just look for any of these common values and have a standard format for them.
// If a specific table needs to format the data further or differently they can do so after running this fx.

// How this function works:
// Take in the raw server response [data] and what the user wants to use [tableHeaders]
// Look at each tableHeader [{ displayName: 'Column Name to show in table', dataName: 'What the final name of this data is' }]
// Then make sure to build the dataName in the final returned object
// Sometimes we can just convert server key/value to finalData key/value.
// Other times (most other times) we need to take server key/value, massage, then add that to finalData key/value

// Note: This function assumes all endpoints have the same relative structure to same named/keyed data.
// Example: We assume votingPower will always be an object with count and total.
// If this assumption cannot be made then this function loses its use and will fail

export const formatTableData = (data = [], tableHeaders) => {
  // If the data doesn't have anything in it, just return it to end this fx
  if (!data.length) return data;
  // Array of required data from the headers
  const reqData = tableHeaders.map(({ dataName }) => dataName);
  // Return the data formatted as needed
  // Each data item is a row in the table, so we will loop through each
  return data.map((dataObj) => {
    // Final formatted row data to add into array
    const finalObj = {};
    // Loop through each required type of data and gather it into the final Obj
    reqData.forEach((dataName) => {
      // serverValue is the default value of the key from the server response
      // Example: dataName = 'hash', dataObj has 'hash' with the value we need, so we'll use it (no modification needed)
      const serverValue = dataObj[dataName];
      switch (dataName) {
        // Address or hash leading to the account's page
        case 'ownerAddress': // fallthrough
        case 'holdingAccount': // fallthrough
        case 'delegatorAddr': // fallthrough
        case 'address':
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            link: `/accounts/${serverValue}`,
            hover: serverValue,
          };
          break;
        // Address or hash leading to the account's page (multiple)
        case 'signers': {
          // Signers is an object containing signers [array] and threshold [number] - we only need the first signers array item
          const signer = serverValue?.signers[0];
          finalObj[dataName] = {
            value: maxLength(signer, 11, 3),
            link: `/accounts/${signer}`,
            hover: signer,
          };
          break;
        }
        // Address or hash leading to the validator's page
        case 'proposerAddress': // fallthrough
        case 'addressId':
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            hover: serverValue,
            link: `/validator/${serverValue}`,
          };
          break;
        // Address or hash leading to the transaction's page
        case 'txHash':
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            link: `/tx/${serverValue}`,
            hover: serverValue,
          };
          break;
        // Address or hash without a link anywhere
        case 'consensusAddress':
          finalObj[dataName] = { value: maxLength(serverValue, 11, 3), hover: serverValue };
          break;
        // Amount of currency/item and its denomination
        case 'balance': {
          const { count = '--', denom = '--' } = serverValue;
          finalObj[dataName] = { value: formatDenom(count, denom, { decimal: 6 }) };
          break;
        }
        // Amount of currency/item and its denomination given in objects (multiple)
        case 'balances': {
          const { amount = '--', denom = '--' } = dataObj || {};
          finalObj[dataName] = {
            value: formatDenom(amount, denom, { decimal: 6, showDenom: false }),
          };
          break;
        }
        // delegator address when delegation (data found in msg)
        case 'delegationFrom': // fallthrough
        case 'delegationTo': {
          const isFrom = dataName === 'delegationFrom';
          const { msg: msgArray = [{}], monikers } = dataObj;

          // If there is more than one msg don't display info here
          if (msgArray.length > 1) {
            finalObj[dataName] = { value: '--' };
            break;
          }

          const { msg = {}, type } = msgArray[0];
          let address;
          switch (type) {
            case 'begin_unbonding':
              address = isFrom ? msg.validatorAddress : msg.delegatorAddress;
              break;
            case 'begin_redelegate':
              address = isFrom ? msg.validatorSrcAddress : msg.validatorDstAddress;
              break;
            case 'clear-contract-admin': //fallthrough
            case 'execute': //fallthrough
            case 'ibc_transfer': //fallthrough
            case 'instantiate': //fallthrough
            case 'migrate': //fallthrough
            case 'store-code':
              address = isFrom ? msg.sender : msg.receiver;
              break;
            case 'addmarker': // fallthrough
            case 'send': //fallthrough
            case 'transfer':
              address = isFrom ? msg.fromAddress : msg.toAddress;
              break;
            case 'delegate': // fallthrough
            default:
              address = isFrom ? msg.delegatorAddress : msg.validatorAddress;
          }

          const value = monikers[address] || maxLength(address, 11, 3);

          if (!address) {
            finalObj[dataName] = { value: '--' };
            break;
          }

          finalObj[dataName] = {
            value,
            hover: address,
            link: `/accounts/${address}`,
          };
          break;
        }
        //
        case 'manager': {
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            hover: serverValue,
            link: `/accounts/${serverValue}`,
          };
          break;
        }
        //
        case 'permissions': {
          finalObj[dataName] = {
            value: serverValue.join(', '),
          };
          break;
        }
        // Amount of currency/item and its denomination given in an object (amount found in msg)
        case 'msgAmount': {
          // No server value, manually grab from dataObj msg
          const { msg: msgArray = [{}], txHash } = dataObj;

          // if there is more than one msg then link to the tx instead of showing the amount
          if (msgArray.length > 1 || msgArray[0].msg.amount?.length > 1) {
            finalObj[dataName] = {
              value: 'More',
              icon: 'CALL_MADE',
              hover: txHash,
              link: `/tx/${txHash}`,
            };
            break;
          }

          const { msg = { amount: {} } } = msgArray[0];
          const { amount, denom } =
            msg.funds?.[0] || msg.amount?.[0] || msg.amount || msg.token || msg.value || {};

          if (!amount) {
            finalObj[dataName] = { value: '--' };
            break;
          }

          finalObj[dataName] = { value: formatDenom(amount, denom) };
          break;
        }
        // Amount of currency/item and its denomination given in an object (amount)
        case 'amount': {
          const { amount = '--', denom = '--' } = serverValue || {};
          finalObj[dataName] = { value: formatDenom(amount, denom) };
          break;
        }
        case 'fee': {
          const { amount = '--', denom = '--' } = serverValue || {};
          finalObj[dataName] = {
            // We don't want to round the fees, they are already rounded when we receive them
            // 20 decimals is the max toLocaleString allows
            value: formatDenom(amount, denom, { decimal: 20 }),
          };
          break;
        }
        case 'reward': {
          const { amount = '--', denom = '--' } = serverValue?.[0] || {};
          finalObj[dataName] = { value: formatDenom(amount, denom, { decimal: 4 }) };
          break;
        }
        // Amount of currency/item and its denomination given in an object (count)
        case 'bondedTokens': // fallthrough
        case 'selfBonded': {
          const { count = '--', denom = '--' } = serverValue || {};
          finalObj[dataName] = { value: formatDenom(count, denom) };
          break;
        }
        // Height of a block
        case 'block': // fallthrough
        case 'height':
          finalObj[dataName] = {
            value: serverValue,
            link: `/block/${serverValue}`,
          };
          break;
        // Denomination or marker value linking to the asset
        case 'denom': // fallthrough
        case 'marker':
          finalObj[dataName] = {
            value: dataObj.displayDenom || serverValue,
            link: `/asset/${serverValue}`,
          };
          break;
        // Name/moniker of a validator linking to its address
        case 'moniker': {
          // Build the link from the addressId or the proposerId or the ownerAddress or the holdingAccount
          // build the link here to not break syntax highlighting :shakesfist:
          const linkAddress =
            dataObj?.addressId ||
            dataObj?.proposerAddress ||
            dataObj?.ownerAddress ||
            dataObj?.holdingAccount;
          finalObj[dataName] = {
            value: serverValue,
            link: `/validator/${linkAddress}`,
            hover: serverValue,
          };
          break;
        }
        // Convert given time to standard readable UTC string
        case 'time': // fallthrough
        case 'lastTxTimestamp': // fallthrough
        case 'timestamp': {
          const value = serverValue ? `${getUTCTime(serverValue)}+UTC` : 'N/A';
          finalObj[dataName] = { value, raw: serverValue };
          break;
        }
        case 'endTime': {
          const value = serverValue ? `${getUTCTime(new Date(serverValue.millis))}+UTC` : 'N/A';
          finalObj[dataName] = { value, raw: serverValue };
          break;
        }
        // Find the transaction type within the message object, then capitalize it
        case 'txType': // fallthrough
        case 'type': {
          // type is nested within msg: [{ type: 'txType' msg: {} }]
          const { msg: msgArray = [{}] } = dataObj;
          const msgNum = msgArray.length > 1 ? `+${msgArray.length - 1}` : '';
          const type = msgArray[0]?.type || '--';
          finalObj[dataName] = {
            value: `${capitalize(type)} ${msgNum}`,
            hover: msgArray.map((t) => capitalize(t.type)).join(' '),
          };
          break;
        }
        // Get the voting power as a percent from the serverValue (object)
        case 'votingPower': {
          const { count, total } = serverValue || {};
          const value = numberFormat((count / total) * 100, 4);
          const finalValue = value >= 1 ? `${value}%` : `< 1%`;
          finalObj[dataName] = { value: finalValue };
          break;
        }
        // Get the amount of validators (object)
        case 'validatorCount': {
          const { count, total } = serverValue || {};
          finalObj[dataName] = { value: `${count} / ${total}` };
          break;
        }
        // Get the asset supply and set to shorthand
        case 'supply': {
          const { amount = '--', denom = '--' } = serverValue;
          finalObj[dataName] = {
            value: formatDenom(amount, denom, { decimals: 3, shorthand: true, showDenom: false }),
            hover: `${numberFormat(amount, 20)} ${denom}`,
          };
          break;
        }
        // Display the percent but make adjustments for low values (<)
        // Server value in a numberFormat as a percentage
        case 'commission': // fallthrough
        case 'percentage': {
          const percentValue = serverValue * 100;
          const percent = percentValue < 0.0001 ? '>0.0001' : numberFormat(percentValue, 4);
          finalObj[dataName] = { value: `${percent} %` };
          break;
        }
        // Holders (asset page) api data is structured differently, handle it here
        case 'percentageHolders': {
          const { count, total } = dataObj?.balance;
          if (count && total) {
            const percentValue = (count / total) * 100;
            const percent = percentValue < 0.0001 ? '>0.0001' : numberFormat(percentValue, 4);
            finalObj[dataName] = { value: `${percent} %` };
          } else {
            finalObj[dataName] = { value: '--' };
          }
          break;
        }
        // Boolean to string
        case 'mintable':
          finalObj[dataName] = { value: capitalize(`${serverValue}`) };
          break;
        // Server value already correct
        case 'bondHeight': // fallthrough
        case 'unbondingHeight': // fallthrough
        case 'currency': // fallthrough
        case 'delegators': // fallthrough
        case 'proposerPriority':
          finalObj[dataName] = { value: serverValue };
          break;
        // Server value in a numberFormat
        case 'shares': // fallthrough
        case 'txNum': // fallthrough
        case 'circulation':
          finalObj[dataName] = { value: numberFormat(serverValue) };
          break;
        // Server value in a numberFormat as a percentage
        case 'uptime': {
          finalObj[dataName] = { value: `${numberFormat(serverValue)} %` };
          break;
        }
        // Server value capitalized
        case 'markerType': // fallthrough
        case 'status':
          finalObj[dataName] = { value: capitalize(serverValue) };
          break;
        default:
          break;
      }
    });
    // Return the modified finalObj (data row)
    return finalObj;
  });
};
