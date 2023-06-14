import axios from "axios";

const getProcesses = async () =>{
    const response =await axios.get("/product-processes")

    return response.data;
}

const addProcess = async (processName: {name: string}) => {
    const response = await axios.post("/add-product-process", processName)

    return response.data;
}


const makeProcessActive = async (id: string) => {
    const response = await axios.put(`/make-active-process/${id}`)

    return response.data;
}


const processServices = {
    getProcesses,
    addProcess,
    makeProcessActive
}

export default processServices
