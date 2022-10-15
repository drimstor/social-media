import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iState {
  isOpen: boolean;
  selectItem: string;
  selectIndex: number;
}

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
    selectSideBarItem(state, action: PayloadAction<string>) {
      state.selectItem = action.payload;
    },
    selectSideBarIndex(state, action: PayloadAction<number>) {
      state.selectIndex = action.payload;
    },
  },
});

export const { toggleSideBar, selectSideBarItem, selectSideBarIndex } =
  sideBarSlice.actions;

export default sideBarSlice.reducer;
