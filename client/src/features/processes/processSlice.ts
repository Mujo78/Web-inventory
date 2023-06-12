import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import processServices from "./processService";


export interface Process {
    _id: string,
    name: string,
    price: number,
    end_date: Date,
    start_date: Date
}

export interface initialStateInterface {
    processes: Process[],
    status: 'idle' | 'pending' | 'failed',
    message: string
}


const initialState : initialStateInterface = {
    processes: [],
    status: "idle",
    message: ""
}


export const getProcesses = createAsyncThunk("process/get", async (_, thunkAPI) => {
    try{
        return await processServices.getProcesses() 
    }catch(error: any){
        const message = error.response.data

        return thunkAPI.rejectWithValue(message)
    }
})

export const makeProcessActive = createAsyncThunk("process/active", async (id: string, thunkAPI) => {
    try{
        return await processServices.makeProcessActive(id)
    }catch(error: any){
        const message = error.response.data;

        return thunkAPI.rejectWithValue(message)
    }
})


export const processSlice = createSlice({
    name: "process",
    initialState,
    reducers:{
        reset: (state) => {
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProcesses.rejected, (state, action) => {
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(getProcesses.pending, (state) =>{
            state.status = "pending"
        })
        .addCase(getProcesses.fulfilled, (state, action) =>{
            state.status = "idle"
            state.processes = action.payload
        })
        .addCase(makeProcessActive.rejected, (state, action) => {
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(makeProcessActive.pending, (state) =>{
            state.status = "pending"
        })
        .addCase(makeProcessActive.fulfilled, (state, action) =>{
            state.status = "idle"
            state.message = action.payload as string
        })
    }
})

export const process = (state: RootState) => state.process
export const {reset} = processSlice.actions
export default processSlice.reducer