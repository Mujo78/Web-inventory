import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import suppReducer from "../features/supplier/suppSlice";
import materialReducer from "../features/material/materialSlice";
import processReducer from "../features/process/processSlice";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    supp: suppReducer,
    matt: materialReducer,
    process: processReducer,
    product: productReducer,
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
