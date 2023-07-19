import axios from "axios";
import {Product, productToCreate} from "./productSlice"

const getProducts = async () =>{
    const response = await axios.get("/products")

    return response.data;
}

const getProduct = async (id:string) => {
    const response = await axios.get(`/product/${id}`)

    return response.data;
}

const createProduct = async (productData : productToCreate) => {
    const response = await axios.post("/add-product", productData)

    return response.data;
}

const editproduct = async (id: string, productData: Product) =>{
    const response = await axios.patch(`/edit-product/${id}`, productData)

    return response.data
}


const productService = {
    getProducts,
    createProduct,
    getProduct,
    editproduct
}

export default productService