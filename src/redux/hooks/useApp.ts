import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectApp as selector,
  appActions as actionsList,
  AppState,
} from '../features/app/appSlice';

export const useApp = () => {
  const dispatch = useAppDispatch();
  const state: AppState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
