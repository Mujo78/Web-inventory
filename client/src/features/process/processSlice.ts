import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import processServices, { ProcessToEdit } from "./processService";
import { selectedMaterials } from "../../components/ProductProcess/PPItems";
import { Material } from "../material/materialSlice";

export interface Process {
  _id: string;
  name: string;
  price: number;
  end_date: Date | null;
  start_date: Date | null;
}

export interface ProductItem {
  _id: string;
  material_id: Material;
  product_process_id: string;
  quantity: number;
}

export interface ProcessesInfo {
  processesNum: number;
  finished: number;
  newOnes: number;
  activeOnes: number;
}

export interface specificProcessType {
  processData: Process;
  processItems: ProductItem[];
}

export interface initialStateInterface {
  processes: Process[];
  processInfo: ProcessesInfo;
  specificProcess?: specificProcessType;
  activeProcess?: specificProcessType;
  status: "idle" | "loading" | "failed";
  message: string;
}

const initialState: initialStateInterface = {
  processes: [],
  processInfo: {
    processesNum: 0,
    finished: 0,
    newOnes: 0,
    activeOnes: 0,
  },
  status: "idle",
  message: "",
};

export const getProcesses = createAsyncThunk<
  Process[],
  { processName?: string } | undefined,
  { state: RootState }
>("processes/get", async (arg, thunkAPI) => {
  try {
    const processName = arg?.processName;
    return await processServices.getProcesses(processName);
  } catch (error: any) {
    const message = error.response.data;

    return thunkAPI.rejectWithValue(message);
  }
});

export const getProcessesInfo = createAsyncThunk(
  "processes-info/get",
  async (_, thunkAPI) => {
    try {
      return await processServices.getProcessInfo();
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProcessById = createAsyncThunk(
  "process/get",
  async (id: string, thunkAPI) => {
    try {
      return await processServices.getProcess(id);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getActiveProcess = createAsyncThunk(
  "active-process/get",
  async (id: string, thunkAPI) => {
    try {
      return await processServices.getProcess(id);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const makeProcess = createAsyncThunk(
  "process/post",
  async (processName: { name: string }, thunkAPI) => {
    try {
      return await processServices.addProcess(processName);
    } catch (error: any) {
      const message = error.response.data.errors.name;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const makeProcessActive = createAsyncThunk(
  "process/activate",
  async (id: string, thunkAPI) => {
    try {
      return await processServices.makeProcessActive(id);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deactivateProcess = createAsyncThunk(
  "process/deactivate",
  async (id: string, thunkAPI) => {
    try {
      return await processServices.deactivateProcess(id);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const makeProcessUsable = createAsyncThunk(
  "process/restore",
  async (id: string, thunkAPI) => {
    try {
      return await processServices.makeProcessUsable(id);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addManyProcessItems = createAsyncThunk(
  "process/post-items",
  async (materialsToAdd: selectedMaterials[], thunkAPI) => {
    try {
      return await processServices.addProcessItems(materialsToAdd);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editSpecificProcess = createAsyncThunk(
  "process/edit",
  async (
    { id, processData }: { id: string; processData: ProcessToEdit },
    thunkAPI
  ) => {
    try {
      return await processServices.editProcess(id, processData);
    } catch (error: any) {
      const message = error.response.data.errors.name;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSpecificProcessItem = createAsyncThunk(
  "process/item-delete",
  async (id: string, thunkAPI) => {
    try {
      return await processServices.deleteProcessItem(id);
    } catch (error: any) {
      const message = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
    },
    resetSpecificProcess: (state) => {
      state.specificProcess = undefined;
    },
    resetCurrentProcess: (state) => {
      state.activeProcess = undefined;
    },
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProcesses.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getProcesses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProcesses.fulfilled, (state, action) => {
        state.status = "idle";
        state.processes = action.payload;
      })
      .addCase(getProcessesInfo.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProcessesInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.processInfo = action.payload;
      })
      .addCase(getProcessById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getProcessById.fulfilled, (state, action) => {
        state.status = "idle";
        state.specificProcess = action.payload;
      })
      .addCase(makeProcess.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(makeProcess.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeProcess.fulfilled, (state, action) => {
        return {
          ...state,
          processes: [...state.processes, action.payload],
          processInfo: {
            ...state.processInfo,
            processesNum: state.processInfo.processesNum + 1,
            newOnes: state.processInfo.newOnes + 1,
          },
          status: "idle",
        };
      })
      .addCase(makeProcessActive.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(makeProcessActive.fulfilled, (state, action) => {
        state.processes.forEach((n) => {
          if (n._id !== action.payload._id && n.end_date === null) {
            n.start_date = null;
          }
        });
        const i = state.processes.findIndex(
          (el) => el._id === action.payload._id
        );
        if (i !== -1) state.processes[i] = action.payload;
        state.status = "idle";
      })
      .addCase(deactivateProcess.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(deactivateProcess.fulfilled, (state, action) => {
        const i = state.processes.findIndex(
          (el) => el._id === action.payload._id
        );
        if (i !== -1) state.processes[i] = action.payload;
        state.status = "idle";
      })
      .addCase(makeProcessUsable.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(makeProcessUsable.fulfilled, (state, action) => {
        const i = state.processes.findIndex(
          (el) => el._id === action.payload._id
        );
        if (i !== -1) state.processes[i] = action.payload;
        state.status = "idle";
      })
      .addCase(editSpecificProcess.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(editSpecificProcess.fulfilled, (state, action) => {
        state.status = "idle";
        const i = state.processes.findIndex(
          (el) => el._id === action.payload._id
        );
        if (i !== -1) state.processes[i] = action.payload;
      })
      .addCase(addManyProcessItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addManyProcessItems.rejected, (state) => {
        state.status = "failed";
        state.message = "There was some error, please try again later!";
      })
      .addCase(addManyProcessItems.fulfilled, (state) => {
        state.status = "idle";
        state.message = "Successfully added items!";
      })

      .addCase(deleteSpecificProcessItem.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })

      .addCase(deleteSpecificProcessItem.fulfilled, (state, action) => {
        if (state.specificProcess) {
          state.specificProcess.processItems =
            state.specificProcess.processItems.filter(
              (i) => i._id !== action.payload
            );
        }
        state.status = "idle";
      })

      .addCase(getActiveProcess.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })

      .addCase(getActiveProcess.fulfilled, (state, action) => {
        state.status = "idle";
        state.activeProcess = action.payload;
      });
  },
});

export const process = (state: RootState) => state.process;
export const { reset, resetSpecificProcess, resetCurrentProcess } =
  processSlice.actions;
export default processSlice.reducer;
