import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Fetch all shop products from backend
export const fetchShopItems = createAsyncThunk(
  'shop/fetchShopItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/shop');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch products');
    }
  }
);

// Create shop product (FormData for file upload)
export const createShopItem = createAsyncThunk(
  'shop/createShopItem',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/shop', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create product');
    }
  }
);

// Edit shop product
export const editShopItem = createAsyncThunk(
  'shop/editShopItem',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/shop/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update product');
    }
  }
);

// Delete shop product
export const removeShopItem = createAsyncThunk(
  'shop/removeShopItem',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/shop/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete product');
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchShopItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchShopItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createShopItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Edit Product
      .addCase(editShopItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Product
      .addCase(removeShopItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default shopSlice.reducer;