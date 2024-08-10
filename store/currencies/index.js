import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExecuteHttpRequest } from "../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../utils";

// Action creator for fetching currencies
export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async (role) => {
    const response = await ExecuteHttpRequest(
      methods.GET,
      UserUrls.fetchCurrencyUrl(role)
    );
    return { state: response?.status, data: response?.data };
  }
);

// Define initial state
const initialState = {
  data: null,
  loading: false,
  message: "",
  error: null,
};

// Create tradeActivities slice
const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setCurrencies(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for fetchCurrencies
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        const response = action.payload;
        state.data = (response && response.data) || [];
        state.message = (response && response.message) || "";
        state.loading = false;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.error?.message || "";
        state.error = action?.error?.message || null;
      });
  },
});

export const { setCurrencies } = currenciesSlice.actions;

export default currenciesSlice.reducer;
