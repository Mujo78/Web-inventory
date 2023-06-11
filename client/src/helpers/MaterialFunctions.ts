import axios from "axios";

export async function getSuppliersWithMaterial(){
    const res = await axios.get("/supplier-materials")
    if(!res.data){
        return "There are no suppliers available"
    }
    return res.data;
}