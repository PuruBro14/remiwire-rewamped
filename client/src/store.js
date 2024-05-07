import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./utils/authSlice";
import profileSlice from "./utils/profileSlice";
import scrollSlice from "./utils/scrollSlice";
import bookCurrencySlice from "./utils/bookCurrencySlice";
import BlockedAccountSlice from "./components/features/BlockedAccountSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    scroll1: scrollSlice,
    bookCurrency: bookCurrencySlice,
    blockeAccountForms: BlockedAccountSlice,
  },
});

export default store;
