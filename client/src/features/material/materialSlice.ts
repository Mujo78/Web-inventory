import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Supplier } from "../supplier/suppSlice"
import materialServices from "./materialService"

export interface Material {
    _id: string,
    name: string,
    quantity: number,
    min_quantity: number,
    price: number,
    unit_of_measure: string,
    is_it_used: boolean,
    supplier_id: Supplier
}

export interface materialState {
    materials: Material[],
    status: 'idle' | 'loading' | 'failed',
    message: string
}

const initialState: materialState = {
    materials: [],
    status: "idle",
    message: ""
}

export const getMaterials = createAsyncThunk("materials/get", async (_, thunkAPI) => {
    try {
        return await materialServices.getMaterials()
    } catch (error: any) {
        const message = error.response

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteMaterialById = createAsyncThunk("materials/delete", async (id: string, thunkAPI) => {
    try {
        return await materialServices.deleteMaterial(id)
    } catch (error: any) {
        const message = error.response

        return thunkAPI.rejectWithValue(message)
    }
})

export const materialSlice = createSlice({
    name: "material",
    initialState,
    reducers: {
        reset: (state) => {
            state.status = "idle"
        }
    },
    extraReducers(builder){
        builder
            .addCase(getMaterials.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getMaterials.fulfilled, (state, action) => {
                state.status = "idle"
                state.materials = action.payload
            })
            .addCase(getMaterials.rejected, (state, action) => {
                state.status = "failed"
                state.message = action.payload as string
            })
            .addCase(deleteMaterialById.rejected, (state, action) => {
                state.status = "failed"
                state.message = action.payload as string
            })
            .addCase(deleteMaterialById.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteMaterialById.fulfilled, (state, action) => {
                state.status = "idle"
                state.materials.filter((n) => n._id !== action.payload)
            })
    }
    
})

export const material = (state: RootState) => state.matt
export const {reset} = materialSlice.actions
export default materialSlice.reducer