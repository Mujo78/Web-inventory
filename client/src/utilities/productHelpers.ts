import axios from "axios";
import { stateProcessInterface } from "../pages/products/AddProduct";

export async function getFreeProcesses(): Promise<stateProcessInterface[]> {
  try {
    const response = await axios.get("/api/free-processes");
    return response.data;
  } catch (err: any) {
    throw new Error("There are no processes available!");
  }
}
