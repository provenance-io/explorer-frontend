import { configureStore, PreloadedState, ThunkAction, Action } from '@reduxjs/toolkit';
import { grantsApi } from 'redux/services';
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
  tx: txReducer,
  validator: validatorReducer,
  [grantsApi.reducerPath]: grantsApi.reducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    devTools: process.env.REACT_APP_ENV === 'local',
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(grantsApi.middleware),
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
