import { createSlice } from "@reduxjs/toolkit";

type iState = {
  isOpen: boolean;
  selectItem: string;
  selectIndex: number;
};

const initialState: iState = {
  isOpen: false,
  selectItem: "chats",
  selectIndex: 2,
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
    selectSideBarIndex(state, action) {
      state.selectIndex = action.payload;
    },
  },
});

export const { toggleSideBar, selectSideBarItem, selectSideBarIndex } =
  sideBarSlice.actions;

export default sideBarSlice.reducer;
