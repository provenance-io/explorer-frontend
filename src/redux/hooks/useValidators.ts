import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import {
  selectValidator as selector,
  validatorActions as actionsList,
} from 'redux/features/validator/validatorSlice';

export const useValidators = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(
    () => bindActionCreators(actionsList, dispatch),
    [dispatch]
  );

  return { ...state, ...actions };
}