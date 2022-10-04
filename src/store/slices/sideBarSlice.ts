import { createSlice } from "@reduxjs/toolkit";

type iState = {
  sideBarState: boolean;
  selectItem: string;
};

const initialState: iState = {
  sideBarState: false,
  selectItem: "Chats",
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.sideBarState = !state.sideBarState;
    },
    selectSideBarItem(state, action) {
      state.selectItem = action.payload;
    },
  },
});

export const { toggleSideBar, selectSideBarItem } = sideBarSlice.actions;

export default sideBarSlice.reducer;
