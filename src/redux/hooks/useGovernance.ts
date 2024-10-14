import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectGovernance as selector,
  governanceActions as actionsList,
  noDispatchActions,
} from '../features/governance/governanceSlice';

export const useGovernance = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions, ...noDispatchActions };
};
