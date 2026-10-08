import axios from '../../lib/axios';

// ✅ Fix: Remove '/api/v1' because it's already set in axios baseURL
const BASE_URL = '/products'; 

// List all products
export const listProducts = () => axios.get(BASE_URL, { withCredentials: true });

// Get product by ID
export const getProductById = (id) => axios.get(`${BASE_URL}/${id}`, { withCredentials: true });

// Add new product (formData with multiple files)
export const addProduct = (formData) =>
  axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

// Update product by ID
export const updateProduct = (id, formData) =>
  axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

// Delete product by ID
export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });