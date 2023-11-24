import axios from "axios";


export interface Material {
    _id: string,
    name: string,
    quantity: number,
    min_quantity: number,
    price: number,
    unit_of_measure: string,
    is_it_used: boolean,
    supplier_id: string
}

export interface MaterialInterface {
    name: string,
    supplier_id: string,
    quantity: number,
    min_quantity: number,
    price: number,
    unit_of_measure: string
}

export async function getSuppliersWithMaterial(){
    const res = await axios.get("/supplier-materials")

    return res.data;
}

export async function getMaterials() {
    const res = await axios.get("/materials")

    return res.data
}

export async function getaterialById(id: string) {
    const res = await axios.get(`material/${id}`)

    return res.data;
}


export async function deleteMaterial(id: string) {
    const res = await axios.delete(`/delete-material/${id}`)

    return res.data;
}

export async function addMaterial(materialData: MaterialInterface) {
    const res = await axios.post("/add-material", materialData)

    return res.data;
}

export async function editMaterial(id: string, materialData: MaterialInterface) {
    const res = await axios.put(`/edit-material/${id}`, materialData)

    return res.data;
}