import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUserState } from "types/iUsers";

interface initialStateProps {
  chatId: string | null;
  user: iUserState | null;
  selectedChat?: string | null;
}

interface payloadProps {
  0: iUserState;
  1: iUserState;
}

const initialState: initialStateProps = {
  chatId: null,
  user: null,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<payloadProps>) {
      state.user = action.payload[1];
      state.chatId =
        action.payload[0].id > action.payload[1].id
          ? action.payload[0].id + action.payload[1].id
          : action.payload[1].id + action.payload[0].id;
      state.selectedChat = action.payload[1].id;
    },
  },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
