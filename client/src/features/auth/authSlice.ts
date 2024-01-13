import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices, { IChangePassword } from "./authService";
import { RootState } from "../../app/store";

type userObject = {
  accessToken: string;
  username: string;
  id: string;
  role: string;
};

export interface AuthState {
  accessUser: userObject | null;
  status: "idle" | "loading" | "failed";
  message: string;
  selected?: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

const user = localStorage.getItem("user");
const storedObject: userObject = user !== null ? JSON.parse(user) : null;

const initialState: AuthState = {
  accessUser: storedObject,
  status: "idle",
  message: "",
  selected: "",
};

export const login = createAsyncThunk(
  "/auth/login",
  async (loginData: LoginUser, thunkAPI) => {
    try {
      return await authServices.login(loginData);
    } catch (error: any) {
      const message = error.response.data.message || error.response.data.errors;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk<
  string,
  { passwordsData: IChangePassword },
  { state: RootState }
>("/auth/change-password", async ({ passwordsData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.accessUser?.accessToken as string;
    const safeToken = token || "";
    return await authServices.changePassword(safeToken, passwordsData);
  } catch (error: any) {
    console.log(error);
    const message = error.response.data.message || error.response.data.errors;

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authServices.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    resetSelected: (state) => {
      state.selected = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.accessUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.accessUser = null;
        state.message = action.payload as string;
      })

      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload as string;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessUser = null;
      });
  },
});

export const authUser = (state: RootState) => state.auth;

export const { reset, setSelected, resetSelected } = authSlice.actions;
export default authSlice.reducer;
