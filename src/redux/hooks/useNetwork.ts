import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectNetwork as selector,
  networkActions as actionsList,
  NetworkState,
} from '../features/network/networkSlice';

export const useNetwork = () => {
  const dispatch = useAppDispatch();
  const state: NetworkState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
