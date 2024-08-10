import { createSlice } from "@reduxjs/toolkit";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  getLocalStorageItemExect,
} from "../../config/AuthSetting";
import { encryptedKeys } from "../../utils";

const initialState = {
  token: getLocalStorageItem(encryptedKeys.token) || null,
  permissions: getLocalStorageItem(encryptedKeys.permissions) || null,
  user: getLocalStorageItem(encryptedKeys.user) || null,
  userInfo: getLocalStorageItem(encryptedKeys.userInfo) || null,
  loginKey: getLocalStorageItemExect(encryptedKeys.loginKey) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      setLocalStorageItem(encryptedKeys.token, action.payload);
    },

    removeToken: (state) => {
      localStorage.removeItem(encryptedKeys.token);
      state.token = null;
    },

    setUser: (state, action) => {
      const user = JSON.stringify(action.payload);
      state.user = user;
      setLocalStorageItem(encryptedKeys.user, user);
    },

    removeUser: (state) => {
      localStorage.removeItem(encryptedKeys.user);
      state.user = null;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(encryptedKeys.userInfo, action.payload);
    },

    setPermissions: (state, action) => {
      state.permissions = action.payload;
      localStorage.setItem(encryptedKeys.permissions, action.payload);
    },

    setLoginKey: (state, action) => {
      state.loginKey = action.payload;
      localStorage.setItem(encryptedKeys.loginKey, action.payload);
    },

    removeLoginKey: (state) => {
      localStorage.removeItem(encryptedKeys.loginKey);
      state.userInfo = null;
    },

    removeUserInfo: (state) => {
      localStorage.removeItem(encryptedKeys.userInfo);
      state.userInfo = null;
    },
    removePermissions: (state) => {
      localStorage.removeItem(encryptedKeys.permissions);
      state.permissions = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  removeUserInfo,
  setPermissions,
  removePermissions,
  setUser,
  removeUser,
  setToken,
  removeToken,
  setLoginKey,
  removeLoginKey,
} = authSlice.actions;

export default authSlice.reducer;
