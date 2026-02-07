import axios from 'axios';

// backend URL
const API_URL = 'http://localhost:8081/api';

// create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// products
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const searchProducts = (name) => api.get(`/products/search?name=${name}`);

// raw materials
export const getRawMaterials = () => api.get('/raw-materials');
export const getRawMaterialById = (id) => api.get(`/raw-materials/${id}`);
export const createRawMaterial = (rawMaterial) => api.post('/raw-materials', rawMaterial);
export const updateRawMaterial = (id, rawMaterial) => api.put(`/raw-materials/${id}`, rawMaterial);
export const deleteRawMaterial = (id) => api.delete(`/raw-materials/${id}`);
export const getRawMaterialsInStock = () => api.get('/raw-materials/in-stock');

// product compositions
export const getCompositionsByProduct = (productId) => api.get(`/products/${productId}/compositions`);
export const addComposition = (productId, composition) => api.post(`/products/${productId}/compositions`, composition);
export const updateComposition = (id, composition) => api.put(`/compositions/${id}`, composition);
export const deleteComposition = (id) => api.delete(`/compositions/${id}`);

// production suggestions
export const getProductionSuggestions = () => api.get('/production/suggestions');

export default api;