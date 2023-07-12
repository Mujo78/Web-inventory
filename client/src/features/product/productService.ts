import axios from "axios";
import {productToCreate} from "./productSlice"

const getProducts = async () =>{
    const response = await axios.get("/products")

    return response.data;
}

const createProduct = async (productData : productToCreate) => {
    const response = await axios.post("/add-product", productData)

    return response.data;
}


const productService = {
    getProducts,
    createProduct
}

export default productService