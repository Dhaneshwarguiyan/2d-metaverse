import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entryCodeDialog: false,
  createSpaceDialog: false,
  optionsDialog: false,
  enterNameDialog:false
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    openEntryCodeDialog: (state) => {
      state.entryCodeDialog = true;
    },
    closeEntryCodeDialog: (state) => {
      state.entryCodeDialog = false;
    },
    openCreateSpaceDialog: (state) => {
      state.createSpaceDialog = true;
    },
    closeCreateSpaceDialog: (state) => {
      state.createSpaceDialog = false;
    },
    toggleOptionsDialog: (state) => {
      state.optionsDialog = !state.optionsDialog;
    },
    closeOptionsDialog: (state) => {
      state.optionsDialog = false;
    },
    openEnterNameDialog: (state) => {
      state.enterNameDialog = true;
    },
    closeEnterNameDialog: (state) => {
      state.enterNameDialog = false;
    }
  },
});

export const {
  openEntryCodeDialog,
  closeEntryCodeDialog,
  openCreateSpaceDialog,
  closeCreateSpaceDialog,
  openEnterNameDialog,
  closeEnterNameDialog
} = toggleSlice.actions;
export default toggleSlice.reducer;
