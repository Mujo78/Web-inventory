import axios from "axios";
import { Supp } from "../../pages/supplier/AddSupplier";

export interface NewSupplier {
    name : string,
    pdv : number,
    phone_number : string,
    contact_person : string,
    email: string
}


const getSuppliers = async() =>{
    const response = await axios.get("/suppliers")

    return response.data
}

const getSupplierById = async(id: string) => {
    const response = await axios.get(`/supplier/${id}`)

    return response.data;
}

const editSupplier = async(id: string, supplierData: Supp) => {
    const response = await axios.put(`/edit-supplier/${id}`, supplierData)

    return response.data;
}

const addSupplier = async(supplierData: NewSupplier) =>{
    const response = await axios.post("/supplier-add", supplierData)

    return response.data;
}

const suppServices = {
    getSuppliers,
    addSupplier,
    editSupplier,
    getSupplierById
}

export default suppServices