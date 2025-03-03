import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: "",
  mapId:-1
};

const mapSlice = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    initMap: (state, action) => {
      state.room = action.payload;
    },
    setMapId: (state,action) => {
      state.mapId = action.payload;
    }
  },
});

export const { initMap,setMapId } = mapSlice.actions;
export default mapSlice.reducer;
