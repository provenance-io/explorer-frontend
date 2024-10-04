import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/store';
import {
  STAKING_DELEGATE_URL,
  STAKING_REDELEGATE_URL,
  STAKING_UNDELEGATE_URL,
  STAKING_WITHDRAW_COMMISSION_URL,
  STAKING_WITHDRAW_REWARDS_URL,
} from '../../../consts';
import { ajax } from '../api';

interface StakingState {}

export interface DelegateProps {
  amount: {
    amount: string;
    denom: string;
  };
  delegator: string;
  validator: string;
}

export interface RedelegateProps {
  amount: {
    amount: string;
    denom: string;
  };
  delegator: string;
  validatorDst: string;
  validatorSrc: string;
}

export interface UndelegateProps extends DelegateProps {}

export interface WithdrawCommissionProps {
  validator: string;
}

export interface WithdrawRewardsProps {
  delegator: string;
  validator: string;
}

export const initialState: StakingState = {};

/* -----------------
** TYPES
-------------------*/

/* -----------------
** ACTIONS
-------------------*/
export const delegateAction = (data: DelegateProps) =>
  ajax({
    url: STAKING_DELEGATE_URL,
    method: 'POST',
    data,
  });

export const redelegateAction = (data: RedelegateProps) =>
  ajax({
    url: STAKING_REDELEGATE_URL,
    method: 'POST',
    data,
  });

export const undelegateAction = (data: UndelegateProps) =>
  ajax({
    url: STAKING_UNDELEGATE_URL,
    method: 'POST',
    data,
  });

export const withdrawCommissionAction = (data: WithdrawCommissionProps) =>
  ajax({
    url: STAKING_WITHDRAW_COMMISSION_URL,
    method: 'POST',
    data,
  });

export const withdrawRewardsAction = (data: WithdrawRewardsProps) =>
  ajax({
    url: STAKING_WITHDRAW_REWARDS_URL,
    method: 'POST',
    data,
  });

export const stakingActions = {};

export const noDispatchActions = {
  delegateAction,
  redelegateAction,
  undelegateAction,
  withdrawCommissionAction,
  withdrawRewardsAction,
};
/* -----------------
** SLICE
-------------------*/
export const stakingSlice = createSlice({
  name: 'staking',
  initialState,
  reducers: {},
});

/* -----------------
SELECTORS
-------------------*/
export const selectStaking = (state: RootState) => state.staking;

export default stakingSlice.reducer;
