import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../features/auth/authSlice";
import suppReducer from "../features/supplier/suppSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    supp:suppReducer
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
