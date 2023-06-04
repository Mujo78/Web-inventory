import axios from "axios";


const getMaterials = async () => {
    const response = await axios.get("/materials")

    return response.data
}

const deleteMaterial = async (id: string) => {
    const response = await axios.delete(`/delete-material/${id}`)
  
    return response.data
}

const materialServices = {
    getMaterials,
    deleteMaterial
}

export default materialServices