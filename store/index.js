import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import balanceReducer from "./balance";
import userProfileReducer from "./userProfile";
import userWalletReducer from "./userWallet";
import currenciesReducer from "./currencies";
import transactionFeeReducer from "./transactionFee";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    userProfile: userProfileReducer,
    userWallet: userWalletReducer,
    currencies: currenciesReducer,
    transactionFee: transactionFeeReducer,
  },
});
