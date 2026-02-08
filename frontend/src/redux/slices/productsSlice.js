// manages products state (list, loading, errors) and API actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts 
} from '../../api/api';

// async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const response = await createProduct(productData);
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, productData }) => {
    const response = await updateProduct(id, productData);
    return response.data;
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

export const searchProductsByName = createAsyncThunk(
  'products/searchProducts',
  async (name) => {
    const response = await searchProducts(name);
    return response.data;
  }
);

// slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // edit product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // remove product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      // search products
      .addCase(searchProductsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchProductsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;