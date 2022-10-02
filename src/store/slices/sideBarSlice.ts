import { createSlice } from "@reduxjs/toolkit";

type iState = {
  sideBarState: boolean;
};

const initialState: iState = {
  sideBarState: false,
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.sideBarState = !state.sideBarState;
    },
  },
});

export const { toggleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
