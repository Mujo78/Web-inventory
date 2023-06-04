import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import suppServices, { NewSupplier } from "./suppService"
import { RootState } from "../../app/store"
import { Supp } from "../../pages/supplier/AddSupplier"

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
    status: 'idle' | 'loading' | 'failed',
    message: string
}

const initialState: suppState = {
    suppliers: [],
    status: 'idle',
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

export const getSupplierById = createAsyncThunk("supplierById/get", async (id:string, thunkAPI) => {
    try{
        return await suppServices.getSupplierById(id)
    }catch(error: any){
        const message = error.response

        return thunkAPI.rejectWithValue(message)
    }
})

export const addNewSupplier = createAsyncThunk("supp/add", async(supplierData: NewSupplier, thunkAPI) => {
    try{
        return await suppServices.addSupplier(supplierData)
    }catch(error: any){
        console.log(error)
        const message = error.response.data.errors[0].msg

        return thunkAPI.rejectWithValue(message)
    }
})

export const editSupplier = createAsyncThunk("supplier/edit", async({ id, supplierData }: { id: string, supplierData: Supp },  thunkAPI) =>{
    try{
        return await suppServices.editSupplier(id, supplierData);
    }catch(error: any){
        console.log(error)
        const message = error.response.data.errors[0];
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const suppSlice = createSlice({
    name: "supplier",
    initialState,
    reducers:{
        reset: (state) => {
            state.status = "idle"
        }
    },
    extraReducers(builder){
        builder
        .addCase(addNewSupplier.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addNewSupplier.fulfilled, (state, action) => {
            state.status = "idle"
            state.suppliers.push(action.payload)
        })
        .addCase(addNewSupplier.rejected, (state, action) =>{
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(editSupplier.pending, (state) => {
            state.status = "loading"
        })
        .addCase(editSupplier.fulfilled, (state, action) => {
            state.status = "idle"
            state.suppliers.push(action.payload)
        })
        .addCase(editSupplier.rejected, (state, action) =>{
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(getSuppliers.fulfilled, (state, action) => {
            state.status = "idle"
            state.suppliers = action.payload
        })
        .addCase(getSuppliers.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getSuppliers.rejected, (state, action) => {
            state.status = "failed"
            state.message = action.payload as string
        })
    }
})

export const supplier = (state: RootState) => state.supp;
export const {reset} = suppSlice.actions
export default suppSlice.reducer