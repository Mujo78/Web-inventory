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
    supplier_id: string
}

export interface MaterialInterface {
    name: string,
    supplier_id: string,
    quantity: number,
    min_quantity: number,
    price: number,
    unit_of_measure: string
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

export const createMaterial = createAsyncThunk("materials/post", async (materialData: MaterialInterface, thunkAPI) => {
    try {
        return await materialServices.addMaterial(materialData)
    } catch (error: any) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const editMaterial = createAsyncThunk("material/edit", async ({id, materialData}: {id: string, materialData: MaterialInterface}, thunkAPI) => {
    try{
        return await materialServices.editMaterial(id, materialData)
    }catch(error: any){
        const message = error.response.data.message;

        return thunkAPI.rejectWithValue(message)
    }
})


export const materialSlice = createSlice({
    name: "material",
    initialState,
    reducers: {
        reset: (state) => {
            state.status = "idle"
        },
        resetmessage: (state) => {
            state.message = ""
        }
    },
    extraReducers(builder){
        builder
            .addCase(createMaterial.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createMaterial.fulfilled, (state, action) => {
                state.materials.push(action.payload)
                state.status = "idle"
            })
            .addCase(createMaterial.rejected, (state, action) =>{
                state.status = "failed"
                state.message = action.payload as string
            })
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
                state.materials = state.materials.filter((n) => n._id !== action.payload)
            })
            .addCase(editMaterial.rejected, (state, action) => {
                state.status = "failed"
                state.message = action.payload as string
            })
            .addCase(editMaterial.pending, (state) => {
                state.status = "loading"
            })
            .addCase(editMaterial.fulfilled, (state, action) => {
                const i = state.materials.findIndex(el => el._id === action.payload._id)
                if(i !== -1) state.materials[i] = action.payload
                state.status = "idle"
            })
    }
    
})

export const material = (state: RootState) => state.matt
export const {reset} = materialSlice.actions
export default materialSlice.reducer