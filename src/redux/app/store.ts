import { configureStore } from '@reduxjs/toolkit';
// import { rootReducer } from 'redux/reducers';
import accountReducer from '../features/account/accountSlice';
import assetReducer from '../features/asset/assetSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    asset: assetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;