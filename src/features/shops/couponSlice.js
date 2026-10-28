import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Fetch all coupons from backend
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/coupons');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch coupons');
    }
  }
);

// Create new coupon
export const createCoupon = createAsyncThunk(
  'coupons/createCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/coupons', couponData);
      return response.data.coupon;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create coupon');
    }
  }
);

// Edit existing coupon
export const editCoupon = createAsyncThunk(
  'coupons/editCoupon',
  async ({ id, couponData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/coupons/${id}`, couponData);
      return response.data.coupon;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update coupon');
    }
  }
);

// Delete coupon
export const removeCoupon = createAsyncThunk(
  'coupons/removeCoupon',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/coupons/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete coupon');
    }
  }
);

const couponSlice = createSlice({
  name: 'coupons',
  initialState: {
    coupons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Coupons
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Coupon
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
      })
      // Edit Coupon
      .addCase(editCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      // Delete Coupon
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((c) => c._id !== action.payload);
      });
  },
});

export default couponSlice.reducer;