import React from "react";
import s from "./Chat.module.scss";
import Message from "./Message";

function ChatMessages() {
  return (
    <div className={s.messages}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default ChatMessages;
