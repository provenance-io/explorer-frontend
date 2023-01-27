import { currencyFormat } from '..//number';
import { maxLength } from '../string/maxLength';
import { numberFormat } from '../number/numberFormat';
import { formatDenom } from '../number/formatDenom';
import { capitalize } from '../string/capitalize';
import { getUTCTime } from '../date/getUTCTime';
import { isEmpty } from '../lang/isEmpty';

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

// Note: For items like account data (possibly others) they must be separated by another field
//       or else it renders incorrectly. Not sure yet why this is occurring, but will be fixed
//       during the reskin effort. Example: Contract 'admin' and 'creator' fields cannot be side
//       by side as it screws up the entire table rendering in each row.

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
      let serverValue = dataObj;
      dataName.split('.').forEach((key) => (serverValue = serverValue?.[key]));

      switch (dataName) {
        // Address or hash leading to the account's page
        case 'ownerAddress': // fallthrough

        case 'holdingAccount': // fallthrough
        case 'delegatorAddr': // fallthrough
        case 'creator': // fallthrough
        case 'admin': // fallthrough
        case 'granter': // fallthrough
        case 'grantee': // fallthrough
        case 'address':
          finalObj[dataName] = {
            value: serverValue ? maxLength(serverValue, 11, 3) : '--',
            link: serverValue && `/accounts/${serverValue}`,
            hover: serverValue || '--',
            copy:
              serverValue &&
              (dataName === 'creator' ||
                dataName === 'admin' ||
                dataName === 'granter' ||
                dataName === 'grantee' ||
                dataObj.copy),
            raw: serverValue,
          };
          break;
        // Address or hash leading to the account's page (multiple)
        case 'signers': {
          // Signers is an object containing signers [array] and threshold [number] - we only need
          // the first value and the length to indicate the total number of signers
          const signer = serverValue?.[0].address;
          finalObj[dataName] = {
            value: maxLength(signer, 11, 3),
            link: `/accounts/${signer}`,
            addTextToLink: serverValue?.length > 1 ? ` +${serverValue?.length - 1}` : '',
            hover: serverValue?.length <= 1 ? signer : `${serverValue.length} total signers`,
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
        case 'txHash': {
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            link: `/tx/${serverValue}/${dataObj.block}`,
            hover: serverValue,
          };
          break;
        }
        // Address or hash leading to the proposal page
        case 'proposalTitle': // fallthrough
        case 'title': {
          const { proposalId } = dataObj;
          finalObj[dataName] = {
            // value: maxLength(proposalId, 11),
            value: serverValue,
            hover: serverValue,
            link: `/proposal/${proposalId}`,
          };
          break;
        }
        // Address or hash leading to nft scope page
        case 'scopeAddr': {
          finalObj[dataName] = {
            value: maxLength(serverValue, 11),
            hover: serverValue,
            link: `/nft/${serverValue}`,
          };
          break;
        }
        // Address or hash leading to contract details page
        case 'contractAddress':
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            link: `/contract/${serverValue}`,
            hover: serverValue,
          };
          break;
        // Address or hash leading to code details page
        case 'codeId':
          finalObj[dataName] = {
            value: maxLength(serverValue, 11, 3),
            link: `/code/${serverValue}`,
            hover: serverValue,
          };
          break;
        // Address or hash without a link anywhere
        case 'consensusAddress':
        case 'dataHash': // fallthrough
        case 'specAddr':
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
        // Amount of currency/item and its denomination given in an object (amount)
        case 'amount': // fallthrough
        case 'depositAmount': {
          const { amount = '--', denom = '--' } = serverValue || {};
          finalObj[dataName] = { value: formatDenom(amount, denom) };
          break;
        }
        case 'hashAmount': {
          const { amount = '--', denom = '--' } = serverValue || {};
          finalObj[dataName] = { value: currencyFormat(amount, denom).amount };
          break;
        }
        case 'fee': // fallthrough
        case 'txFee': {
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
        case 'blockHeight': // fallthrough
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
            dataObj?.holdingAccount ||
            '';
          finalObj[dataName] = {
            value: serverValue,
            link: `/validator/${linkAddress}`,
            hover: serverValue,
            blockImage: dataObj && {
              icon: dataObj.imgUrl,
              moniker: serverValue,
              address: linkAddress,
            },
          };
          break;
        }
        // Address / Moniker of a voter
        case 'voter': {
          const isValidator = !isEmpty(serverValue.validatorAddr);
          const page = isValidator ? 'validator' : 'accounts';
          const address = isValidator ? serverValue.validatorAddr : serverValue.address;
          const value = serverValue?.moniker || address;

          finalObj[dataName] = {
            value: maxLength(value, 16, 3),
            link: `/${page}/${address}`,
            hover: value,
          };
          break;
        }
        // Check that voting times are not the default time starting in 1901
        case 'votingTime.endTime': //fallthrough
        case 'votingTime.startTime': {
          const value = serverValue
            ? getUTCTime(serverValue).slice(0, 4) !== '1901' &&
              getUTCTime(serverValue).slice(0, 4) !== '1970'
              ? `${getUTCTime(serverValue)}+UTC`
              : '--'
            : 'N/A';
          finalObj[dataName] = { value, raw: serverValue };
          break;
        }
        // Convert given time to standard readable UTC string
        case 'depositEndTime': // fallthrough
        case 'lastUpdated': // fallthrough
        case 'submitTime': // fallthrough
        case 'time': // fallthrough
        case 'lastTx': // fallthrough
        case 'lastTxTimestamp': // fallthrough
        case 'timestamp': // fallthrough
        case 'txTimestamp': // fallthrough
        case 'txTime': {
          const value = serverValue ? `${getUTCTime(serverValue)}+UTC` : 'N/A';
          finalObj[dataName] = { value, raw: serverValue };
          break;
        }
        // Authz grant expiration info
        case 'expiration': {
          const value = serverValue ? `${getUTCTime(serverValue, 'MMM dd, yyyy')}` : 'N/A';
          finalObj[dataName] = { value, raw: serverValue };
          break;
        }
        case 'endTime': {
          const value = serverValue
            ? `${getUTCTime(new Date(serverValue.millis ? serverValue.millis : serverValue))}+UTC`
            : 'N/A';
          finalObj[dataName] = { value, raw: serverValue };
          break;
        }
        // Find the transaction type within the message object, then capitalize it
        case 'txType': // fallthrough
        case 'type': {
          // If granter exists, it's a grant type
          if (dataObj.granter) {
            finalObj[dataName] = {
              value: `${capitalize(serverValue)}`,
            };
          } else {
            const {
              msg: { msgCount, displayMsgType: type = '--' },
            } = dataObj;
            const msgNum = msgCount > 1 ? `+${msgCount - 1}` : '';
            finalObj[dataName] = {
              value: `${capitalize(type)} ${msgNum}`,
            };
          }
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
          const percent = percentValue < 0.0001 ? '<0.0001' : numberFormat(percentValue, 4);
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
        // proposal deposit percentage
        case 'deposit': {
          const { current, needed } = serverValue;
          if (current && needed) {
            const percentValue = (current / needed) * 100;
            const percent =
              percentValue < 0.0001
                ? '<0.0001'
                : percentValue > 100
                ? '>100'
                : numberFormat(percentValue, 4);
            finalObj[dataName] = { value: `${percent}%` };
          } else {
            finalObj[dataName] = { value: '--' };
          }
          break;
        }
        // Version update events
        case 'events': {
          finalObj[dataName] = {
            value: dataObj.scheduled ? 'Scheduled' : dataObj.skipped ? '* Skipped' : '',
            hover: serverValue,
            raw: serverValue,
          };
          break;
        }
        // Block proposer true/false
        // Validator voting status
        case 'isProposer': // fallthrough
        case 'didVote':
          finalObj[dataName] = {
            value: '',
            icon: serverValue ? 'CHECK' : dataName === 'didVote' ? 'CLEAR' : '',
            iconColor: serverValue ? 'rgb(78, 210, 44)' : 'red',
            size: '2.0rem',
          };
          break;
        // Accordion information
        case 'accordion': {
          finalObj[dataName] = {
            value: '',
          };
          break;
        }
        // Boolean to string
        case 'mintable':
          finalObj[dataName] = { value: capitalize(`${serverValue}`) };
          break;
        // Set text styles
        case 'upgradeHeight': // fallthrough
        case 'currentVersion':
          finalObj[dataName] = {
            value: serverValue,
            skipped: dataObj.skipped,
            scheduled: dataObj.scheduled,
          };
          break;
        // Add upgrade name url
        case 'upgradeName':
          finalObj[dataName] = {
            value: serverValue,
            externalLink: dataObj.releaseUrl,
            skipped: dataObj.skipped,
            scheduled: dataObj.scheduled,
          };
          break;
        // Attribute data
        case 'data':
          finalObj[dataName] = {
            value: maxLength(serverValue, 20, 3),
            copy: true,
            hover: `${dataObj.attribute} data`,
            raw: serverValue,
          };
          break;
        // Regex for channel state
        case 'channelStatus': {
          const state = serverValue.match(/_(.*)/)[1];
          finalObj[dataName] = { value: capitalize(state) };
          break;
        }
        // Replace null with --
        case 'hr24Change':
          finalObj[dataName] = {
            value: serverValue || '--',
            color: serverValue > 0 ? 'rgb(78, 210, 44)' : serverValue < 0 ? 'red' : '',
          };
          break;
        // Break up pricing object
        case 'pricePerToken': // fallthrough
        case 'supply.pricePerToken': {
          const decimals = dataObj.displayDenom === 'hash' ? 3 : 2;
          finalObj[dataName] = {
            value: serverValue
              ? `$${formatDenom(
                  dataObj.exponent
                    ? serverValue.amount * 10 ** dataObj.exponent
                    : serverValue.amount,
                  serverValue.denom,
                  { decimal: decimals, minimumFractionDigits: decimals }
                )}`
              : dataName === 'pricePerToken'
              ? '--'
              : '-- --',
          };
          break;
        }

        case 'totalBalancePrice.amount':
          finalObj[dataName] = {
            value: serverValue
              ? `$${formatDenom(serverValue, 'USD', { decimal: 2, minimumFractionDigits: 2 })}`
              : '--',
          };
          break;
        // TokenStats Range Data
        case 'range':
          finalObj[dataName] = {
            value: serverValue === '1001-' ? '1000+' : serverValue,
          };
          break;

        // Server value already correct
        case 'sequence': // fallthrough
        case 'contractCount': // fallthrough
        case 'creationHeight': // fallthrough
        case 'hashBucket': // fallthrough
        case 'label': // fallthrough
        case 'percentTotal': // fallthrough
        case 'amountHash': // fallthrough
        case 'chainId': // fallthrough
        case 'channelStats': // fallthrough
        case 'srcChannel': // fallthrough
        case 'dstChannel': // fallthrough
        case 'attribute': // fallthrough
        case 'initialVersion': // fallthrough
        case 'bondHeight': // fallthrough
        case 'unbondingHeight': // fallthrough
        case 'currency': // fallthrough
        case 'delegators': // fallthrough
        case 'totalBalancePrice': // fallthrough
        case 'param_name': // fallthrough
        case 'value': // fallthrough
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
        // Server value capitalized, remove VOTE_OPTION_
        case 'answer': {
          const colors = {
            VOTE_OPTION_YES: 'CHART_PIE_G', // yes
            VOTE_OPTION_NO: 'CHART_PIE_NO', // no - light blue
            VOTE_OPTION_ABSTAIN: 'CHART_PIE_ABSTAIN', // abstain should be grey
            VOTE_OPTION_NO_WITH_VETO: 'CHART_PIE_NOWITHVETO', // noWithVeto - red
          };
          let voteString = '';
          const progressData = [];
          Object.keys(serverValue).forEach((vote) => {
            voteString += `${capitalize(vote.replace(/vote_option_/gi, ''))} (${
              serverValue[vote] ? parseFloat(serverValue[vote]) * 100 : '0'
            }%); `;
            progressData.push({
              color: colors[vote],
              value: serverValue[vote] * 100,
            });
          });
          finalObj[dataName] = {
            value: progressData,
            hover: voteString,
          };
          break;
        }
        case 'proposalStatus': // fallthrough
        case 'txStatus': //fallthrough
        case 'status':
          finalObj[dataName] = { value: capitalize(serverValue.replace(/proposal_status/gi, '')) };
          break;
        // Server value capitalized
        case 'depositType': // fallthrough
        case 'markerType': // fallthrough
        case 'proposalId': // fallthrough
        case 'proposalType': // fallthrough
        case 'specName': // fallthrough
        case 'txMsgType':
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
