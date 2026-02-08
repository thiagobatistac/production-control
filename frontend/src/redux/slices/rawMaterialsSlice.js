// manages raw materials state (list, loading, errors) and API actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getRawMaterials, 
  createRawMaterial, 
  updateRawMaterial, 
  deleteRawMaterial,
  getRawMaterialsInStock
} from '../../api/api';

// async thunks for API calls
export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetchRawMaterials',
  async () => {
    const response = await getRawMaterials();
    return response.data;
  }
);

export const addRawMaterial = createAsyncThunk(
  'rawMaterials/addRawMaterial',
  async (rawMaterialData) => {
    const response = await createRawMaterial(rawMaterialData);
    return response.data;
  }
);

export const editRawMaterial = createAsyncThunk(
  'rawMaterials/editRawMaterial',
  async ({ id, rawMaterialData }) => {
    const response = await updateRawMaterial(id, rawMaterialData);
    return response.data;
  }
);

export const removeRawMaterial = createAsyncThunk(
  'rawMaterials/removeRawMaterial',
  async (id) => {
    await deleteRawMaterial(id);
    return id;
  }
);

export const fetchRawMaterialsInStock = createAsyncThunk(
  'rawMaterials/fetchRawMaterialsInStock',
  async () => {
    const response = await getRawMaterialsInStock();
    return response.data;
  }
);

// slice
const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch raw materials
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // add raw material
      .addCase(addRawMaterial.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // edit raw material
      .addCase(editRawMaterial.fulfilled, (state, action) => {
        const index = state.items.findIndex(rm => rm.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // remove raw material
      .addCase(removeRawMaterial.fulfilled, (state, action) => {
        state.items = state.items.filter(rm => rm.id !== action.payload);
      })
      // fetch raw materials in stock
      .addCase(fetchRawMaterialsInStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterialsInStock.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterialsInStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rawMaterialsSlice.reducer;