import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./utils/authSlice";
import profileSlice from "./utils/profileSlice";
import scrollSlice from "./utils/scrollSlice";
import bookCurrencySlice from "./utils/bookCurrencySlice";
import BlockedAccountSlice from "./components/features/BlockedAccountSlice";
import GICAccountSlice from "./components/features/GICAccountSlice";
import SendMoneySlice from "./components/features/SendMoneySlice";
import NRIRepatriationSlice from "./components/features/NRIRepatriationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    scroll: scrollSlice,
    bookCurrency: bookCurrencySlice,
    blockeAccountForms: BlockedAccountSlice,
    gicAccountForms: GICAccountSlice,
    sendMoneyAboroadForms: SendMoneySlice,
    NRIRepatriationForms: NRIRepatriationSlice,
  },
});

export default store;
