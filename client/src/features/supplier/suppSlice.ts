import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import suppServices from "./suppService"
import { RootState } from "../../app/store"

export interface Supplier {
    _id: string,
    name: string,
    uid: string,
    pdv: number,
    phone_number: string,
    contact_person: string,
    email: string,
    end_date: Date,
    start_date: Date
}

export interface suppState {
   suppliers: Supplier[],
   isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const initialState: suppState = {
    suppliers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getSuppliers = createAsyncThunk("supplier/get", async (_, thunkAPI) => {
    try{
        return await suppServices.getSuppliers()
    }catch(error: any){
        const message = error.response

        return thunkAPI.rejectWithValue(message)
    }
})

export const suppSlice = createSlice({
    name: "supplier",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers(builder){
        builder
        .addCase(getSuppliers.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.suppliers = action.payload
        })
        .addCase(getSuppliers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSuppliers.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
    }
})

export const supplier = (state: RootState) => state.supp;
export const {reset} = suppSlice.actions
export default suppSlice.reducer