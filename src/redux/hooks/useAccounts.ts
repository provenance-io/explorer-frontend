import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAccount as selector,
  accountActions as actionsList,
  AccountState,
} from '../features/account/accountSlice';

export const useAccounts = () => {
  const dispatch = useAppDispatch();
  const state: AccountState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
