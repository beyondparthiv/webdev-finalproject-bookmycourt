import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookings: [],
};
const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, { payload: bookings }) => {
      state.bookings = bookings;
    },
  },
});
export const { setBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;