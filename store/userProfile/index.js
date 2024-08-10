import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExecuteHttpRequest } from "../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../utils";

// Action creator for fetching userProfile
export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async () => {
    const response = await ExecuteHttpRequest(
      methods.GET,
      UserUrls.userProfileUrl
    );
    return { status: response?.status, data: response?.data };
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
const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for fetchUserProfile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const response = action.payload;
        state.data = (response && response.data) || [];
        state.message = (response && response.message) || "";
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.error?.message || "";
        state.error = action?.error?.message || null;
      });
  },
});

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
