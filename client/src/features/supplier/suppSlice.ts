import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import suppServices, { NewSupplier } from "./suppService";
import { RootState } from "../../app/store";
import { Supp } from "../../pages/supplier/AddSupplier";

export interface Supplier {
  _id: string;
  name: string;
  uid: string;
  pdv: number;
  phone_number: string;
  contact_person: string;
  email: string;
  end_date: Date;
  start_date: Date;
}

export type SuppliersData = {
  currentPage?: number;
  data: Supplier[];
  numOfPages?: number;
};

export interface suppState {
  suppliers: SuppliersData;
  specificSupplier?: Supplier;
  status: "idle" | "loading" | "failed" | "start";
  message: string;
}

const initialState: suppState = {
  suppliers: {
    data: [],
  },
  status: "start",
  message: "",
};

export const getSuppliers = createAsyncThunk<
  SuppliersData,
  { searchQuery?: string; page: number; limit?: number } | undefined,
  { state: RootState }
>("suppliers/get", async (args, thunkAPI) => {
  try {
    return await suppServices.getSuppliers(args);
  } catch (error: any) {
    const message = error.response;

    return thunkAPI.rejectWithValue(message);
  }
});

export const getSupplier = createAsyncThunk(
  "supplier/get",
  async (id: string, thunkAPI) => {
    try {
      return await suppServices.getSupplierById(id);
    } catch (error: any) {
      const message = error.response;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addNewSupplier = createAsyncThunk(
  "supplier/post",
  async (supplierData: NewSupplier, thunkAPI) => {
    try {
      return await suppServices.addSupplier(supplierData);
    } catch (error: any) {
      const message = error.response.data.errors[0].msg;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editSupplier = createAsyncThunk(
  "supplier/put",
  async (
    { id, supplierData }: { id: string; supplierData: Supp },
    thunkAPI
  ) => {
    try {
      return await suppServices.editSupplier(id, supplierData);
    } catch (error: any) {
      const message = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const suppSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "start";
      state.message = "";
    },
    resetSupplier: (state) => {
      state.specificSupplier = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewSupplier.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = "Successfully added new supplier!";
        state.suppliers.data.push(action.payload);
      })
      .addCase(addNewSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(addNewSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSupplier.fulfilled, (state, action) => {
        state.status = "idle";
        const i = state.suppliers.data.findIndex(
          (el) => el._id === action.payload._id
        );
        if (i !== -1) state.suppliers.data[i] = action.payload;
      })
      .addCase(editSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.status = "idle";
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getSupplier.fulfilled, (state, action) => {
        state.status = "idle";
        state.specificSupplier = action.payload;
      });
  },
});

export const supplier = (state: RootState) => state.supp;
export const { reset, resetSupplier } = suppSlice.actions;
export default suppSlice.reducer;
