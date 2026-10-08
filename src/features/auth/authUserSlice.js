
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authUserAPI';

export const signupUser = createAsyncThunk('auth/signupUser', async (userData) => {
  const response = await authAPI.signup(userData);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await authAPI.login(credentials);
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authAPI.logout();
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  const response = await authAPI.getProfile();
  return response.data;
});

export const verifyOtpUser = createAsyncThunk('auth/verifyOtpUser', async (otpData) => {
  const response = await authAPI.verifyOtp(otpData);
  return response.data;
});

export const getAllProfile = createAsyncThunk('auth/getAllProfile', async () => {
  const response = await authAPI.getAllProfile();
  return response.data;
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async (id) => {
  const response = await authAPI.deleteUser(id);
  return response.data;
})

export const UpdateProfile = createAsyncThunk('auth/UpdateProfile', async ({ id, userData }) => {
  const response = await authAPI.UpdateProfile(id, userData);
  return response.data;
});
export const searchUser = createAsyncThunk('auth/searchUser', async (query) => {
  const response = await authAPI.searchUser(query);
  return response.data;
});

export const fetchBillingInfo = createAsyncThunk(
  'auth/fetchBillingInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getBillingInfo();
      return response.data.billingInfo;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveBillingInfoThunk = createAsyncThunk(
  'auth/saveBillingInfo',
  async (billingInfo, { rejectWithValue }) => {
    try {
      const response = await authAPI.saveBillingInfo(billingInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
 initialState: {
    user: null,
    loading: false,
    users: [],
    error: null,
    isAuthenticated: false,
    isInitialized: false,
    searchLoading: false,
    searchError: null,
    searchResult: null,
    billingInfo: null,
    billingLoading: false,
    billingError: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    forceInitialization(state) {
      state.isInitialized = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  state.isAuthenticated = true;
  state.isInitialized = true;
  if (action.payload?.accessToken) {
    localStorage.setItem("accessToken", action.payload.accessToken);
  }
})
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
        // Don't set error for profile fetch failures as it's expected when not logged in
        if (action.error.message !== 'Request failed with status code 401' &&
          action.error.message !== 'Request failed with status code 500') {
          state.error = action.error.message;
        }
      })
      .addCase(verifyOtpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(verifyOtpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true;
      })
      .addCase(getAllProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.isInitialized = true;
      })
      .addCase(getAllProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload._id);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UpdateProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchUser.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message;
      })
      .addCase(fetchBillingInfo.pending, (state) => {
        state.billingLoading = true;
        state.billingError = null;
      })
      .addCase(fetchBillingInfo.fulfilled, (state, action) => {
        state.billingLoading = false;
        state.billingInfo = action.payload;
      })
      .addCase(fetchBillingInfo.rejected, (state, action) => {
        state.billingLoading = false;
        state.billingInfo = null;
        state.billingError = action.payload;
      })
      .addCase(saveBillingInfoThunk.pending, (state) => {
        state.billingLoading = true;
        state.billingError = null;
      })
      .addCase(saveBillingInfoThunk.fulfilled, (state, action) => {
        state.billingLoading = false;
        state.billingInfo = action.payload;
      })
      .addCase(saveBillingInfoThunk.rejected, (state, action) => {
        state.billingLoading = false;
        state.billingError = action.payload;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
