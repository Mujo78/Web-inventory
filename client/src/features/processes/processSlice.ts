import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import processServices from "./processService";
import { selectedMaterials } from "../../components/PPItems";


export interface Process {
    _id: string,
    name: string,
    price: number,
    end_date: Date,
    start_date: Date | null
}

export interface initialStateInterface {
    processes: Process[],
    status: 'idle' | 'loading' | 'failed',
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

export const makeProcess = createAsyncThunk("process/post", async (processName:{name: string}, thunkAPI) => {
    try{
        return await processServices.addProcess(processName)
    }catch(error: any){
        const message = error.response.data.errors.name
       
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

export const deactivateProcess = createAsyncThunk("process/deactivate", async (id: string, thunkAPI) => {
    try{
        return await processServices.deactivateProcess(id)
    }catch(error: any){
        const message = error.response.data;

        return thunkAPI.rejectWithValue(message)
    }
})

export const addManyProcessItems = createAsyncThunk("process/post-items", async (materialsToAdd : selectedMaterials[], thunkAPI) => {
    try{
        return await processServices.addProcessItems(materialsToAdd)
    }catch(error: any){
        console.log(error)
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
            state.status = "loading"
        })
        .addCase(getProcesses.fulfilled, (state, action) =>{
            state.status = "idle"
            state.processes = action.payload
        })
        .addCase(makeProcess.rejected, (state, action) =>{
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(makeProcess.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(makeProcess.fulfilled, (state, action) =>{
            state.processes.push(action.payload)
            state.status = "idle"
        })
        .addCase(makeProcessActive.rejected, (state, action) => {
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(makeProcessActive.fulfilled, (state, action) =>{
            state.processes.forEach((n) => {
                if(n._id !== action.payload._id && n.end_date === null){ 
                    n.start_date = null;
                }
            })
            const i = state.processes.findIndex(el => el._id === action.payload._id)
            if(i !== -1) state.processes[i] = action.payload
            state.status = "idle"
            
        })
        .addCase(deactivateProcess.rejected, (state, action) =>{
            state.status = "failed"
            state.message = action.payload as string
        })
        .addCase(deactivateProcess.fulfilled, (state, action) => {
            const i = state.processes.findIndex(el => el._id === action.payload._id)
            if(i !== -1) state.processes[i] = action.payload
            state.status = "idle"
        })
        .addCase(addManyProcessItems.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addManyProcessItems.rejected, (state) => {
            state.status = "failed"
            state.message = "There was some error, please try again later!"
        })
        .addCase(addManyProcessItems.fulfilled, (state) => {
            state.status = "idle"
            state.message = "Successfully added items!"
        })
    }
})

export const process = (state: RootState) => state.process
export const {reset} = processSlice.actions
export default processSlice.reducer