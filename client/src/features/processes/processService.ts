import axios from "axios";
import { selectedMaterials } from "../../components/PPItems";

const getProcesses = async () =>{
    const response =await axios.get("/product-processes")

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


const processServices = {
    getProcesses,
    addProcess,
    makeProcessActive,
    addProcessItems,
    deactivateProcess
}

export default processServices
