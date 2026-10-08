import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecentWinners } from './winnersAPI';

export const getRecentWinners = createAsyncThunk(
  'winner/getRecentWinners',
  async (period, { rejectWithValue }) => {
    try {
      const res = await fetchRecentWinners(period);
      return res.data.winners; // or res.data if direct array
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const winnerSlice = createSlice({
  name: 'winner',
  initialState: {
    winners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload;
      })
      .addCase(getRecentWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default winnerSlice.reducer;
