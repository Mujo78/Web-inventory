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
    specificProduct? : Product,
    status: "idle" | "loading" | "failed" | "start",
    message: string
}

const initialState: initialStateInterface = {
    products : [],
    status: "start",
    message: ""
}

export const getProducts = createAsyncThunk("products/get",async (_,thunkAPI) => {
    try{
        return await productService.getProducts()
    }catch(error: any){
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const getProduct = createAsyncThunk("product/get",async (id: string,thunkAPI) => {
    try{
        return await productService.getProduct(id)
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

export const editProduct = createAsyncThunk("product/patch", async ({id, productData}:{id: string, productData: Product}, thunkAPI) => {
    try {
        return await productService.editproduct(id, productData)
    } catch (error: any) {
        const message = error.response.data
        console.log(message)
        
        return thunkAPI.rejectWithValue(message)
    }
})



export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) =>{
            state.message = ""
            state.status = "start"
        },
        resetProduct: state =>{
            state.specificProduct = undefined
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
            .addCase(getProduct.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.status = "failed"
                state.message = action.payload as string
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.status = "idle"
                state.specificProduct = action.payload
            })
            .addCase(createNewProduct.fulfilled, (state, action) =>{
                state.status = "idle"
                state.message = "Successfully added a new product!"
                state.products.push(action.payload)
            })
            .addCase(createNewProduct.rejected, (state, action) =>{
                state.status = "failed"
                state.message = action.payload as string
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.payload as string
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                console.log(action.meta)
                state.status = 'idle'
                const i = state.products.findIndex(p => p._id === action.payload._id)
                if(i !== -1) state.products[i] = action.payload
            })
    }
})


export const product = (state: RootState) => state.product
export const  {reset, resetProduct} = productSlice.actions
export default productSlice.reducer