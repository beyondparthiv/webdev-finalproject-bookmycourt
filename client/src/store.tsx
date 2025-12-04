import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./pages/Account/reducer";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;