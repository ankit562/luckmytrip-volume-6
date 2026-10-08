import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  startTicketPurchase,
  getUserCart,
  updateCartItem,
  removeCartItem,
  placeOrder,
  getPurchaseDetails,
} from "./addtocartAPI";

// 1. Load initial cart state from localStorage, fallback to default if not present
const getInitialCartState = () => {
  const local = localStorage.getItem("cartItems");
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // Fallback on parse error
    }
  }
  return {
    cartItems: {
      dubaiQty: 0,
      thailandQty: 0,
      goldenWinnerQty: 0,
      giftQty: 0,
      dubaiPrice: 0,
      thailandPrice: 0,
      goldenWinnerPrice: 0,
      giftPrice: 0,
      goaQty: 0,
      goaPrice: 0,
      jackpotQty: 0,
      jackpotPrice: 0,

    },
    carts: [],
    loading: false,
    error: null,
    paymentRequest: null,
    currentPurchase: null,
    purchaseLoading: false,
    purchaseError: null,
  };
};

// 2. Helper to write cart state to localStorage
const saveCartState = (state) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify({
      cartItems: state.cartItems,
      // Don't store server state fields
    })
  );
};

// 3. Initial state uses loader
const initialState = {
  ...getInitialCartState(),
  // Always include fields not in localStorage
  carts: [],
  loading: false,
  error: null,
  paymentRequest: null,
  currentPurchase: null,
  purchaseLoading: false,
  purchaseError: null,
};

export const createPurchase = createAsyncThunk(
  "cart/createPurchase",
  async (purchaseData, { rejectWithValue }) => {
    try {
      const data = await startTicketPurchase(purchaseData);
      return data.purchase;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserCart();
      return data.carts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ itemId, updateData }, { rejectWithValue }) => {
    try {
      const data = await updateCartItem(itemId, updateData);
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId, { rejectWithValue }) => {
    try {
      await removeCartItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const placeOrders = createAsyncThunk(
  "cart/placeOrder",
  async (purchaseId, { rejectWithValue }) => {
    try {
      const data = await placeOrder(purchaseId);
      return data.paymentRequest;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPurchaseById = createAsyncThunk(
  "cart/fetchPurchaseById",
  async (purchaseId, { rejectWithValue }) => {
    try {
      const data = await getPurchaseDetails(purchaseId);
      return data.purchase;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const addtocartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setDubaiQtys(state, action) {
      state.cartItems.dubaiQty = action.payload;
      saveCartState(state);
    },
    setThailandQtys(state, action) {
      state.cartItems.thailandQty = action.payload;
      saveCartState(state);
    },
    setGoldenWinnerQtys(state, action) {
      state.cartItems.goldenWinnerQty = action.payload;
      saveCartState(state);
    },
    setGiftQtys(state, action) {
      state.cartItems.giftQty = action.payload;
      saveCartState(state);
    },

    setDubaiPrices(state, action) {
      state.cartItems.dubaiPrice = action.payload;
      saveCartState(state);
    },
    setThailandPrices(state, action) {
      state.cartItems.thailandPrice = action.payload;
      saveCartState(state);
    },
    setGoldenWinnerPrices(state, action) {
      state.cartItems.goldenWinnerPrice = action.payload;
      saveCartState(state);
    },
    setGiftPrices(state, action) {
      state.cartItems.giftPrice = action.payload;
      saveCartState(state);
    },

    setGoaQtys(state, action) {
      state.cartItems.goaQty = action.payload;
      saveCartState(state);
    },
    setGoaPrices(state, action) {
      state.cartItems.goaPrice = action.payload;
      saveCartState(state);
    },
    setJackpotQtys(state, action) {
      state.cartItems.jackpotQty = action.payload;
      saveCartState(state);
    },
    setJackpotPrices(state, action) {
      state.cartItems.jackpotPrice = action.payload;
      saveCartState(state);
    },
  

    clearCartItems(state) {
      state.cartItems = {
        dubaiQty: 0,
        thailandQty: 0,
        goldenWinnerQty: 0,
        giftQty: 0,
        dubaiPrice: 0,
        thailandPrice: 0,
        goldenWinnerPrice: 0,
        giftPrice: 0,
        goaQty: 0,
        goaPrice: 0,
        jackpotQty: 0,
        jackpotPrice: 0,
      };
      saveCartState(state);
    },

    clearCurrentPurchase(state) {
      state.currentPurchase = null;
      state.purchaseError = null;
    },
    hydrateCartFromStorage(state) {
      // Use when you want to forcibly reload from localStorage (if needed)
      const local = localStorage.getItem("cartItems");
      if (local) {
        state.cartItems = JSON.parse(local).cartItems || state.cartItems;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.carts.push(action.payload);
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.carts.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.carts[index] = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = state.carts.filter(c => c._id !== action.payload);
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(placeOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentRequest = action.payload;
      })
      .addCase(placeOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPurchaseById.pending, (state) => {
        state.purchaseLoading = true;
        state.purchaseError = null;
      })
      .addCase(fetchPurchaseById.fulfilled, (state, action) => {
        state.purchaseLoading = false;
        state.currentPurchase = action.payload;
      })
      .addCase(fetchPurchaseById.rejected, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseError = action.payload;
      });
  }
});

export const {
  setDubaiQtys,
  setThailandQtys,
  setGoldenWinnerQtys,
  setGiftQtys,
  clearCartItems,
  setDubaiPrices,
  setThailandPrices,
  setGoldenWinnerPrices,
  setGiftPrices,
  clearCurrentPurchase,
  hydrateCartFromStorage,
  setGoaQtys,
  setGoaPrices,
  setJackpotQtys,
  setJackpotPrices,
} = addtocartSlice.actions;

export default addtocartSlice.reducer;
