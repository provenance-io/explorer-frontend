import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectNft as selector,
  nftActions as actionsList,
  NftState,
} from '../features/nft/nftSlice';

export const useNft = () => {
  const dispatch = useAppDispatch();
  const state: NftState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
