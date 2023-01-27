import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectContract as selector,
  contractActions as actionsList,
  ContractState,
} from '../features/contract/contractSlice';

export const useContracts = () => {
  const dispatch = useAppDispatch();
  const state: ContractState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
