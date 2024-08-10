import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExecuteHttpRequest } from "../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../utils";

// Action creator for fetching UserWallet
export const fetchUserWallet = createAsyncThunk(
  "userWallet/fetchUserWallets",
  async () => {
    const response = await ExecuteHttpRequest(
      methods.GET,
      UserUrls.fetchWalletsUrl
    );
    let data = {};
    if (response?.data && response?.data.length > 0) {
      response?.data.map((wallet, i) => {
        data[wallet.type] = wallet.data;
        data[wallet.type].id = response?.data?.[i]?.id;
        return wallet;
      });
    }
    return { state: response?.status, data };
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
const userWalletSlice = createSlice({
  name: "userWallet",
  initialState,
  reducers: {
    setUserWallet(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for fetchUserWallet
    builder
      .addCase(fetchUserWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserWallet.fulfilled, (state, action) => {
        const response = action.payload;
        state.data = (response && response.data) || [];
        state.message = (response && response.message) || "";
        state.loading = false;
      })
      .addCase(fetchUserWallet.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.error?.message || "";
        state.error = action?.error?.message || null;
      });
  },
});

export const { setUserWallet } = userWalletSlice.actions;

export default userWalletSlice.reducer;
