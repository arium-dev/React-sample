import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExecuteHttpRequest } from "../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../utils";

// Action creator for fetching Transaction Fee
export const fetchTransactionFee = createAsyncThunk(
  "user/TransactionFee",
  async () => {
    const response = await ExecuteHttpRequest(
      methods.GET,
      UserUrls.getTransactionFeeUrl
    );

    return {
      state: response?.status,
      data: response?.data,
      message: response?.message,
    };
  }
);

// Define initial state
const initialState = {
  transactionFee: "",
  loading: false,
  message: "",
  error: null,
};

// Create transaction Fee slice
const transactionFeeSlice = createSlice({
  name: "transactionFee",
  initialState,
  reducers: {
    setTransactionFee(state, action) {
      state.transactionFee = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for fetchTransactionFee
    builder
      .addCase(fetchTransactionFee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionFee.fulfilled, (state, action) => {
        const response = action.payload;
        state.transactionFee = (response && response.data) || "";
        state.message = (response && response.message) || "";
        state.loading = false;
      })
      .addCase(fetchTransactionFee.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.error?.message || "";
        state.error = action?.error?.message || null;
      });
  },
});

export const { setTransactionFee } = transactionFeeSlice.actions;

export default transactionFeeSlice.reducer;
