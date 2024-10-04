import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectBlock as selector,
  blockActions as actionsList,
} from '../features/block/blockSlice';

export const useBlocks = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(
    () => bindActionCreators(actionsList, dispatch),
    [dispatch]
  );

  return { ...state, ...actions };
}