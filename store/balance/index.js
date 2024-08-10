import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExecuteHttpRequest } from "../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../utils";

// Action creator for fetching user balance
export const fetchBalance = createAsyncThunk("user/fetchBalance", async () => {
  const response = await ExecuteHttpRequest(
    methods.GET,
    UserUrls.userBalanceUrl
  );

  return {
    state: response?.status,
    data: response?.data?.balance,
    message: response?.message,
  };
});

// Define initial state
const initialState = {
  balance: "",
  loading: false,
  message: "",
  error: null,
};

// Create balances slice
const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for fetchBalance
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        const response = action.payload;
        state.balance = (response && response.data) || "";
        state.message = (response && response.message) || "";
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.error?.message || "";
        state.error = action?.error?.message || null;
      });
  },
});

export const { setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
