import { createSlice } from "@reduxjs/toolkit";

interface userInfo {
  username: string;
  token: string;
}

interface userInterface {
  loggedin: boolean;
  info: userInfo | null;
}

const initialState: userInterface = {
  loggedin: false,
  info: null,
};

const useSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loggedin = true;
      state.info = action.payload;
    },
    logoutUser: (state) => {
      state.loggedin = false;
      state.info = null;
    },
  },
});

export const { loginUser, logoutUser } = useSlice.actions;
export default useSlice.reducer;
