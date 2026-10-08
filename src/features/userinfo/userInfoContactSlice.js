import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {updateUserInfo , getUserInfoById , addUserInfo , listUserInfos , deleteUserInfo} from './userInfoContactAPI';

// Async thunks for API calls
export const fetchUserInfos = createAsyncThunk(
  'userInfo/fetchUserInfos',
  async () => {
    const response = await listUserInfos();
    return response.data;
  }
);

export const fetchUserInfoById = createAsyncThunk(
  'userInfo/fetchUserInfoById',
  async (id) => {
    const response = await getUserInfoById(id);
    return response.data;
  }
);

export const createUserInfo = createAsyncThunk(
  'userInfo/createUserInfo',
  async (userData) => {
    const response = await addUserInfo(userData);
    return response.data;
  }
);

export const updateUserInfos = createAsyncThunk(
  'userInfo/updateUserInfo',
  async ({ id, userData }) => {
    const response = await updateUserInfo(id, userData);
    return response.data;
  }
);

export const deleteUserInfos = createAsyncThunk(
  'userInfo/deleteUserInfo',
  async (id) => {
    await deleteUserInfo(id);
    return id;
  }
);

// Initial state
const initialState = {
  userInfos: [],
  currentUserInfo: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchUserInfos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfos.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos = action.payload;
      })
      .addCase(fetchUserInfos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch by ID
      .addCase(fetchUserInfoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserInfo = action.payload;
      })
      .addCase(fetchUserInfoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create User
      .addCase(createUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos.push(action.payload.user);
        state.successMessage = action.payload.message;
      })
      .addCase(createUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update User
      .addCase(updateUserInfos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfos.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userInfos.findIndex(u => u._id === action.payload.user._id);
        if (index !== -1) state.userInfos[index] = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(updateUserInfos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete User
      .addCase(deleteUserInfos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserInfos.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos = state.userInfos.filter(u => u._id !== action.payload);
        state.successMessage = "User deleted!";
      })
      .addCase(deleteUserInfos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMessages } = userInfoSlice.actions;

export default userInfoSlice.reducer;
