import axios from "axios";
import { MaterialInterface } from "./materialSlice";

const getMaterials = async () => {
    const response = await axios.get("/materials")

    return response.data
}

const getMaterialById = async (id: string) => {
    const response = await axios.get(`/material/${id}`)

    return response.data
}

const deleteMaterial = async (id: string) => {
    const response = await axios.delete(`/delete-material/${id}`)
  
    return response.data
}

const addMaterial = async (materialData: MaterialInterface) => {
    const response = await axios.post("/add-material", materialData)

    return response.data
}

const editMaterial = async (id: string, materialData: MaterialInterface) =>{
    const response = await axios.put(`/edit-material/${id}`, materialData)

    return response.data
}

const materialServices = {
    getMaterials,
    deleteMaterial,
    addMaterial,
    editMaterial,
    getMaterialById
}

export default materialServices