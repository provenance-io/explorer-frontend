import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectValidator as selector,
  validatorActions as actionsList,
  ValidatorState,
} from '../features/validator/validatorSlice';

export const useValidators = () => {
  const dispatch = useAppDispatch();
  const state: ValidatorState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
