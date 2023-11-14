import axios from "axios";
import { selectedMaterials } from "../../components/ProductProcess/PPItems";

export interface ProcessToEdit {
    name: string,
    price: number
}

const getProcesses = async () =>{
    const response =await axios.get("/product-processes")

    return response.data;
}

const getProcess = async (id: string) =>{
    const response = await axios.get(`/product-process/${id}`)

    return response.data;
}

const addProcess = async (processName: {name: string}) => {
    const response = await axios.post("/add-product-process", processName)

    return response.data;
}

const addProcessItems = async (materialsToAdd : selectedMaterials[]) =>{
    const response = await axios.post("/add-process-item", materialsToAdd)

    return response.data;
}

const makeProcessActive = async (id: string) => {
    const response = await axios.patch(`/make-active-process/${id}`)

    return response.data;
}

const deactivateProcess = async (id: string) => {
    const response = await axios.patch(`/deactivate-process/${id}`)

    return response.data;
}

const makeProcessUsable = async (id: string) => {
    const response = await axios.patch(`/make-usable-process/${id}`)

    return response.data;
}

const editProcess = async(id: string, processData: ProcessToEdit) =>{
    const response = await axios.put(`/edit-product-process/${id}`, processData)

    return response.data;
}

const deleteProcessItem = async (id: string) => {
    const response = await axios.delete(`/item/${id}`)

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
    deleteProcessItem
}

export default processServices
