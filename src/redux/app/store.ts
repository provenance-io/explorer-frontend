import { configureStore, PreloadedState, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from 'redux/services/serviceApi';
import { combineReducers } from 'redux';
import accountReducer from '../features/account/accountSlice';
import assetReducer from '../features/asset/assetSlice';
import appReducer from '../features/app/appSlice';
import blockReducer from '../features/block/blockSlice';
import contractReducer from '../features/contract/contractSlice';
import faucetReducer from '../features/faucet/faucetSlice';
import governanceReducer from '../features/governance/governanceSlice';
import ibcReducer from '../features/ibc/ibcSlice';
import nameReducer from '../features/name/nameSlice';
import networkReducer from '../features/network/networkSlice';
import nftReducer from '../features/nft/nftSlice';
import notificationReducer from '../features/notification/notificationSlice';
import orderbookReducer from '../features/orderbook/orderbookSlice';
import stakingReducer from '../features/staking/stakingSlice';
import txReducer from '../features/tx/txSlice';
import validatorReducer from '../features/validator/validatorSlice';

export const rootReducer = combineReducers({
  account: accountReducer,
  asset: assetReducer,
  app: appReducer,
  block: blockReducer,
  contract: contractReducer,
  faucet: faucetReducer,
  governance: governanceReducer,
  ibc: ibcReducer,
  name: nameReducer,
  network: networkReducer,
  nft: nftReducer,
  notification: notificationReducer,
  orderbook: orderbookReducer,
  staking: stakingReducer,
  tx: txReducer,
  validator: validatorReducer,
  [api.reducerPath]: api.reducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    devTools: process.env.REACT_APP_ENV === 'local',
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
    preloadedState,
  });

// Infer the `RootState` and `AppDispatch` types from the rootReducer itself
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
