import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectFaucet as selector,
  faucetActions as actionsList,
  noDispatchActions,
} from '../features/faucet/faucetSlice';

export const useFaucet = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(
    () => bindActionCreators(actionsList, dispatch),
    [dispatch]
  );

  return { ...state, ...actions, ...noDispatchActions };
}