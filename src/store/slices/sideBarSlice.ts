import { createSlice } from "@reduxjs/toolkit";

type iState = {
  isOpen: boolean;
  selectItem: string;
};

const initialState: iState = {
  isOpen: false,
  selectItem: "Chats",
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.isOpen = !state.isOpen;
    },
    selectSideBarItem(state, action) {
      state.selectItem = action.payload;
    },
  },
});

export const { toggleSideBar, selectSideBarItem } = sideBarSlice.actions;

export default sideBarSlice.reducer;
