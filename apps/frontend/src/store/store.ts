import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userslice";
import mapSlice from "../slices/mapSlice";
import toggleSlice from "../slices/toggleSlice";
import renderSlice from "../slices/renderSlice";
import audioSlice from "../slices/audioSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    map: mapSlice,
    toggleDialog: toggleSlice,
    render: renderSlice,
    audio:audioSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
