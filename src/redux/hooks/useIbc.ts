import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectIbc as selector,
  ibcActions as actionsList,
} from '../features/ibc/ibcSlice';

export const useIbc = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(
    () => bindActionCreators(actionsList, dispatch),
    [dispatch]
  );

  return { ...state, ...actions };
}