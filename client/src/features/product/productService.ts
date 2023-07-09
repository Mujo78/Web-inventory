import axios from "axios";


const getProducts = async () =>{
    const response = await axios.get("/products")

    return response.data;
}


const productService = {
    getProducts
}

export default productService