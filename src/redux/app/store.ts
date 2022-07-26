import { configureStore } from '@reduxjs/toolkit';
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

export const store = configureStore({
  reducer: {
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
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;