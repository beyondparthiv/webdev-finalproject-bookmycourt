import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = bookingSlice.actions;
export default bookingSlice.reducer;