import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
  user: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<any>) {
      state.user = action.payload[1];
      state.chatId =
        action.payload[0].id > action.payload[1].id
          ? action.payload[0].id + action.payload[1].id
          : action.payload[1].id + action.payload[0].id;
    },
  },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
