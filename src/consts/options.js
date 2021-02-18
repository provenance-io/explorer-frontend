export const VALIDATOR_STATUS_OPTIONS = {
  active: { isDefault: true, title: 'Active' },
  candidate: { title: 'Candidate' },
  jailed: { title: 'Jailed' },
};

export const TRANSACTION_TYPE_OPTIONS = {
  allTxTypes: {
    isDefault: true,
    title: 'All Tx Types',
  },
  transfer: {
    title: 'Transfer',
    options: {
      transfer: { title: 'Transfer' },
      burn: { title: 'Burn' },
      setMemoRegexp: { title: 'Set Memo Regexp' },
    },
  },
  delegation: {
    title: 'Delegation',
    options: {
      delegate: { title: 'Delegate' },
      beginRedelegate: { title: 'Begin Redelegate' },
      setWithdrawAddress: { title: 'Set Withdraw Address' },
      beginUnbonding: { title: 'Begin Unbonding' },
      withdrawDelegatorReward: { title: 'Withdraw Delegator Reward' },
      withdrawDelegatorRewardsAll: { title: 'Withdraw Delegator Rewards All' },
    },
  },
  validation: {
    title: 'Validation',
    options: {
      createValidator: { title: 'Create Validator' },
      editValidator: { title: 'Edit Validator' },
      unjail: { title: 'Unjail' },
      withdrawValidatorRewardsAll: { title: 'Withdraw Validator Rewards All' },
    },
  },
  gov: {
    title: 'Gov',
    options: {
      submitPropsal: { title: 'Submit Proposal' },
      deposit: { title: 'Deposit' },
      vote: { title: 'Vote' },
    },
  },
  others: {
    title: 'Others',
    options: {
      issueToken: { title: 'Issue Token' },
      editToken: { title: 'Edit Token' },
      mintToken: { title: 'Mint Token' },
      transferTokenOwner: { title: 'Transfer Token Owner' },
      createGateway: { title: 'Create Gateway' },
      editGateway: { title: 'Edit Gateway' },
      transferGatewayOwner: { title: 'Transfer Gateway Owner' },
      requestRand: { title: 'Request Rand' },
      addProfiler: { title: 'Add Profiler' },
      addTrustee: { title: 'Add Trustee' },
      deleteProfiler: { title: 'Delete Profiler' },
      deleteTrustee: { title: 'Delete Trustee' },
      claimHTLC: { title: 'Claim HTLC' },
      createHTLC: { title: 'Create HTLC' },
      refundHTLC: { title: 'Refund HTLC' },
      addLiquidity: { title: 'Add Liquidity' },
      removeLiquidity: { title: 'Remove Liquidity' },
      swapOrder: { title: 'Swap Order' },
    },
  },
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
