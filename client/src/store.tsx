import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./pages/Account/reducer";
import bookingReducer from "./pages/Account/Profile/MyBookings/reducer";

const store = configureStore({
  reducer: {
    account: accountReducer,
    //court: courtReducer,
    booking: bookingReducer
  },
});

export default store;