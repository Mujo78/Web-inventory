import axios from "axios";


const getSuppliers = async() =>{
    const response = await axios.get("/suppliers")

    return response.data
}

const suppServices = {
    getSuppliers
}

export default suppServices