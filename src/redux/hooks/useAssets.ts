import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAsset as selector,
  AssetState,
  assetActions as actionsList,
} from '../features/asset/assetSlice';

export const useAssets = () => {
  const dispatch = useAppDispatch();
  const state: AssetState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
