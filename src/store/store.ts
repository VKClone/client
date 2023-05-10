import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import userpage from './slices/userpage';
import feed from './slices/feed';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    userpage: userpage,
    feed: feed
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
