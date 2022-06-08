import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import {
  selectNetwork as selector,
  networkActions as actionsList,
} from 'redux/features/network/networkSlice';

export const useNetwork = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(
    () => bindActionCreators(actionsList, dispatch),
    [dispatch]
  );

  return { ...state, ...actions };
}