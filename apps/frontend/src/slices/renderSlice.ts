import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaces: 1,
};

const renderSlice = createSlice({
  name: "render",
  initialState: initialState,
  reducers: {
    updateSpace: (state) => {
      state.spaces = state.spaces + 1;
    },
  },
});

export const { updateSpace } = renderSlice.actions;
export default renderSlice.reducer;
