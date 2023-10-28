import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iChangeChatPayload, iChat } from "types/iUser";

interface initialStateProps {
  user: iChat;
  selectedChat?: string;
}

const initialState: initialStateProps = {
  user: {
    avatar: "",
    name: "",
    id: "",
  },
  selectedChat: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<iChangeChatPayload>) {
      state.user.avatar = action.payload.avatar;
      state.user.name = action.payload.name;
      state.user.id = action.payload.id;
      state.selectedChat = action.payload.chatId;
    },
  },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
