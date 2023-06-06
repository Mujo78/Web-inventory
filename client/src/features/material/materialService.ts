import axios from "axios";
import { MaterialInterface } from "./materialSlice";

const getMaterials = async () => {
    const response = await axios.get("/materials")

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

const materialServices = {
    getMaterials,
    deleteMaterial,
    addMaterial
}

export default materialServices