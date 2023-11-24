import axios from "axios";
import { selectedMaterials } from "../../components/ProductProcess/PPItems";

export interface ProcessToEdit {
    name: string,
    price: number
}

const getProcesses = async (processName?: string) =>{
    const response =await axios.get("/api/product-processes", {
        params: {processName: processName?.trim()}
    })

    return response.data;
}

const getProcessInfo = async () => {
    const response =await axios.get("/api/product-process-info")
    
    return response.data;
}

const getProcess = async (id: string) =>{
    const response = await axios.get(`/api/product-process/${id}`)

    return response.data;
}

const addProcess = async (processName: {name: string}) => {
    const response = await axios.post("/api/add-product-process", processName)

    return response.data;
}

const addProcessItems = async (materialsToAdd : selectedMaterials[]) =>{
    const response = await axios.post("/api/add-process-item", materialsToAdd)

    return response.data;
}

const makeProcessActive = async (id: string) => {
    const response = await axios.patch(`/api/make-active-process/${id}`)

    return response.data;
}

const deactivateProcess = async (id: string) => {
    const response = await axios.patch(`/api/deactivate-process/${id}`)

    return response.data;
}

const makeProcessUsable = async (id: string) => {
    const response = await axios.patch(`/api/make-usable-process/${id}`)

    return response.data;
}

const editProcess = async(id: string, processData: ProcessToEdit) =>{
    const response = await axios.put(`/api/edit-product-process/${id}`, processData)

    return response.data;
}

const deleteProcessItem = async (id: string) => {
    const response = await axios.delete(`/api/item/${id}`)

    return response.data;
}

const processServices = {
    getProcesses,
    addProcess,
    makeProcessActive,
    addProcessItems,
    deactivateProcess,
    getProcess,
    makeProcessUsable,
    editProcess,
    deleteProcessItem,
    getProcessInfo
}

export default processServices
