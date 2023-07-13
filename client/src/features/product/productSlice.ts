import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import productService from "./productService";

export interface Product {
    _id: string,
    name: string,
    photo_url: string,
    product_process_id: string,
    mark_up: number,
    price: number
}

export interface productToCreate {
    name: string,
    photo_url: string,
    product_process_id : string,
    mark_up: number,
}


interface initialStateInterface {
    products: Product[],
    status: "idle" | "loading" | "failed",
    message: string
}

const initialState: initialStateInterface = {
    products : [],
    status: "idle",
    message: ""
}

export const getProducts = createAsyncThunk("product/get",async (_,thunkAPI) => {
    try{
        return await productService.getProducts()
    }catch(error: any){
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const createNewProduct = createAsyncThunk("product/post", async (productData: productToCreate, thunkAPI) => {
    try {
        return await productService.createProduct(productData)
    } catch (error: any) {
        const message = error.response.data
        console.log(error)
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) =>{
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.rejected, (state, action) => {
                state.status = "failed"
                state.message = action.payload as string
            })
            .addCase(getProducts.pending, (state) =>{
                state.status = "loading"
            })
            .addCase(getProducts.fulfilled, (state, action) =>{
                state.products = action.payload
                state.status = "idle"
            })
            .addCase(createNewProduct.fulfilled, (state, action) =>{
                state.products.push(action.payload)
                state.status = "idle"
                state.message = ""
            })
            .addCase(createNewProduct.rejected, (state, action) =>{
                state.status = "failed"
                state.message = action.payload as string
            })
    }
})


export const product = (state: RootState) => state.product
export const  {reset} = productSlice.actions
export default productSlice.reducer