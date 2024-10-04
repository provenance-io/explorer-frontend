import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectOrderbook as selector,
  orderbookActions as actionsList,
} from '../features/orderbook/orderbookSlice';

export const useOrderbook = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(
    () => bindActionCreators(actionsList, dispatch),
    [dispatch]
  );

  return { ...state, ...actions };
}