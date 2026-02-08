// combines all slices into a single global state
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import rawMaterialsReducer from './slices/rawMaterialsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
  },
});