import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  listProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from './productAPI';

// Fetch all products thunk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await listProducts();
    return res.data;
  }
);

// Fetch single product thunk
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    const res = await getProductById(id);
    return res.data;
  }
);

// Create product thunk
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData) => {
    const res = await addProduct(formData);
    return res.data.product; // resp contains {message, product}
  }
);

// Edit product thunk
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, formData }) => {
    const res = await updateProduct(id, formData);
    return res.data.product;
  }
);

// Delete product thunk
export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        state.products = state.products.map(prod =>
          prod._id === action.payload._id ? action.payload : prod
        );
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(prod => prod._id !== action.payload);
      });
  }
});

export default productSlice.reducer;
