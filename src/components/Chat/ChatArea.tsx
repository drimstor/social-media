import { useAppSelector } from "hooks/redux";
import React from "react";
import s from "./Chat.module.scss";
import ChatControl from "./ChatControl";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatArea() {
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  return (
    <div className={s.chatArea}>
      {!selectedChat && <div className={s.chatAreaBanner}></div>}
      <ChatControl />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
