import Big from 'big.js';
import { HashDataProps } from 'redux/services';

// Returns totals of all hash values in the account by type

export interface AccountHashTotals {
  hashTotal: number;
  hashSpendable: number;
  hashDelegations: number;
  hashRedelegations: number;
  hashUnbondings: number;
  hashRewards: number;
  hashAvailable: number;
}

export const accountHashTotals = (hashData?: HashDataProps) => {
  if (hashData) {
    const hashDelegations = new Big(
      Number(hashData.delegations.rollupTotals?.bondedTotal?.amount || 0)
    ).toNumber();
    const hashRedelegations = new Big(
      hashData?.redelegations?.rollupTotals?.redelegationTotal?.amount || 0
    ).toNumber();
    const hashUnbondings = new Big(
      hashData?.unbonding?.rollupTotals?.unbondingTotal?.amount || 0
    ).toNumber();
    const hashRewards = new Big(hashData?.rewards?.total[0]?.amount || 0).toNumber();
    const hashAvailable = new Big(Number(hashData.assets.total.amount || 0)).toNumber();
    const hashSpendable = new Big(Number(hashData.assets.spendable.amount || 0)).toNumber();
    const hashTotal =
      hashAvailable + hashDelegations + hashRedelegations + hashUnbondings + hashRewards;
    return {
      hashTotal,
      hashSpendable,
      hashDelegations,
      hashRedelegations,
      hashUnbondings,
      hashRewards,
      hashAvailable,
    };
  } else {
    return {
      hashTotal: 0,
      hashSpendable: 0,
      hashDelegations: 0,
      hashRedelegations: 0,
      hashUnbondings: 0,
      hashRewards: 0,
      hashAvailable: 0,
    };
  }
};
