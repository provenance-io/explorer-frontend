import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectName as selector,
  nameActions as actionsList,
  NameTreeState,
} from '../features/name/nameSlice';

export const useName = () => {
  const dispatch = useAppDispatch();
  const state: NameTreeState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
