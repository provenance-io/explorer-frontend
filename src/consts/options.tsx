import { STAKING_TYPES } from './staking';
import { VOTING_TYPES } from './voting';

export const MY_VALIDATOR_STATUS_OPTIONS = {
  [STAKING_TYPES.DELEGATE]: { isDefault: true, title: 'Delegate' },
  [STAKING_TYPES.REDELEGATE]: { title: 'Redelegate' },
  [STAKING_TYPES.UNDELEGATE]: { title: 'Undelegate' },
};

export const MY_VOTE_OPTIONS = {
  [VOTING_TYPES.UNSPECIFIED]: { isDefault: true, title: '--' },
  [VOTING_TYPES.YES]: { isDefault: true, title: 'Yes' },
  [VOTING_TYPES.ABSTAIN]: { title: 'Abstain' },
  [VOTING_TYPES.NO]: { title: 'No' },
  [VOTING_TYPES.NO_WITH_VETO]: { title: 'No With Veto' },
};

export const VALIDATOR_STATUS_OPTIONS = {
  active: { isDefault: true, title: 'Active' },
  candidate: { title: 'Candidate' },
  jailed: { title: 'Jailed' },
};

export const TRANSFER_TYPE_OPTIONS = {
  allTxTypes: 'All Tx Types',
  Transfer: {
    transfer: 'Transfer',
    burn: 'Burn',
    setMemoRegexp: 'Set Memo Regexp',
  },
};

export const TRANSACTION_STATUS_OPTIONS = {
  all: { title: 'All', isDefault: true },
  success: { title: 'Success' },
  failure: { title: 'Failure' },
};

export const TRANSACTION_HISTORY_GRANULARITY_OPTIONS = {
  day: { title: 'Day', isDefault: true },
  hour: { title: 'Hour' },
};

export const PRICE_HISTORY_GRANULARITY_OPTIONS = {
  day: { title: 'Day', isDefault: true },
  hour: { title: 'Hour' },
};

export const GAS_GRANULARITY_OPTIONS = {
  day: { title: 'Day', isDefault: true },
  hour: { title: 'Hour' },
};
