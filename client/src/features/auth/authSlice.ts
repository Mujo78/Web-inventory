import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authServices from "./authService"
import { RootState } from "../../app/store"


export interface AuthState {
    accessUser: string | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

export interface LoginUser {
    username: string,
    password: string
}

const user = localStorage.getItem('accessUser')

const initialState: AuthState = {
    accessUser: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const login = createAsyncThunk("/auth/login", async(loginData: LoginUser, thunkAPI) => {
    try{
        return await authServices.login(loginData)
    }catch(error: any){
        const message = error.response.data.message || error.response.data.errors

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("auth/logout",
    async() => {
        await authServices.logout()
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.accessUser = action.payload
            })
            .addCase(login.rejected, (state, action) =>{
                state.isError = true;
                state.isLoading = false;
                state.accessUser = null;
                state.message = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.accessUser = null
            })
    },
})

export const authUser = (state: RootState) => state.auth;

export const {reset} = authSlice.actions
export default authSlice.reducer;