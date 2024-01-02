import axios from "axios";
import { stateProcessInterface } from "../pages/products/AddProduct";

export async function getFreeProcesses(): Promise<stateProcessInterface[]> {
  try {
    const response = await axios.get("/free-processes");
    return response.data;
  } catch (err) {
    throw new Error("There are no processes here!");
  }
}
