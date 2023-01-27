import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectTx as selector, txActions as actionsList, TxState } from '../features/tx/txSlice';

export const useTxs = () => {
  const dispatch = useAppDispatch();
  const state: TxState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
