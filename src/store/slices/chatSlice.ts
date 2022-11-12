import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUserState } from "types/iUser";

interface initialStateProps {
  chatId: string;
  user: iUserState;
  selectedChat?: string;
}

const initialState: initialStateProps = {
  chatId: "",
  user: {
    photoURL: null,
    displayName: "",
    email: "",
    id: "",
  },
  selectedChat: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<iUserState[]>) {
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
