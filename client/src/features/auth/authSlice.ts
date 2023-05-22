import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authServices from "./authService"
import { RootState } from "../../app/store"


export interface AuthState {
    accessUser: string,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean
}

export interface LoginUser {
    username: string,
    password: string
}

const user = localStorage.getItem('accessUser')

const initialState: AuthState = {
    accessUser: user ? user : "",
    isError: false,
    isSuccess: false,
    isLoading: false
}

export const login = createAsyncThunk("/auth/login", async(loginData: LoginUser, thunkAPI) => {
    try{
        return await authServices.login(loginData)
    }catch(error: any){
        const message = error.response.data.message || error.response.data.errors

        return thunkAPI.rejectWithValue(message)
    }
})

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
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.accessUser = action.payload
            })
            .addCase(login.rejected, (state) =>{
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.accessUser = ""
            })
    },
})

export const authUser = (state: RootState) => state.auth;

export const {reset} = authSlice.actions
export default authSlice.reducer;