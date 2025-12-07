import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  turfs: [],
};

const turfsSlice = createSlice({
  name: "turfs",
  initialState,
  reducers: {
    addNewTurf: (state, { payload: turf }) => {
      const newTurf = { ...turf, _id: uuidv4() };
      state.turfs = [...state.turfs, newTurf] as any;
    },
    deleteTurf: (state, { payload: turfId }) => {
      state.turfs = state.turfs.filter(
        (turf: any) => turf._id !== turfId
      );
    },
    updateTurf: (state, { payload: turf }) => {
      state.turfs = state.turfs.map((t: any) =>
        t._id === turf._id ? turf : t
      ) as any;
    },

    
    
    setTurfs: (state, { payload: turfs }) => {
      state.turfs = turfs;
    },

  },
});
export const { addNewTurf, deleteTurf, updateTurf, setTurfs } =
  turfsSlice.actions;
export default turfsSlice.reducer;