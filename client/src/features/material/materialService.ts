import axios from "axios";
import { MaterialInterface } from "./materialSlice";

const getMaterials = async (searchInput?: string) => {
  const response = await axios.get(`/api/materials`, {
    params: { searchQuery: searchInput?.trim() },
  });

  return response.data;
};

const getMaterialById = async (id: string) => {
  const response = await axios.get(`/api/material/${id}`);

  return response.data;
};

const deleteMaterial = async (id: string) => {
  const response = await axios.delete(`/api/delete-material/${id}`);

  return response.data;
};

const addMaterial = async (materialData: MaterialInterface) => {
  const response = await axios.post("/api/add-material", materialData);

  return response.data;
};

const editMaterial = async (id: string, materialData: MaterialInterface) => {
  const response = await axios.put(`/api/edit-material/${id}`, materialData);

  return response.data;
};

const materialServices = {
  getMaterials,
  deleteMaterial,
  addMaterial,
  editMaterial,
  getMaterialById,
};

export default materialServices;
