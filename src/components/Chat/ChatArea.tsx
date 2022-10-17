import { useAppSelector } from "hooks/redux";
import React from "react";
import s from "./Chat.module.scss";
import ChatControl from "./ChatControl";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatArea() {
  const selectChat = useAppSelector((state) => state.chat.selectedChat);
  return (
    <div className={s.chatArea}>
      {selectChat === null && <div className={s.chatAreaBanner}></div>}
      <ChatControl />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
