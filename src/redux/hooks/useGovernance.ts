import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectGovernance as selector,
  governanceActions as actionsList,
  noDispatchActions,
  GovernanceState,
} from '../features/governance/governanceSlice';

export const useGovernance = () => {
  const dispatch = useAppDispatch();
  const state: GovernanceState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions, ...noDispatchActions };
};
