import React from "react";
import iUsers from "types/iUsers";
import s from "./Chat.module.scss";
import ChatControl from "./ChatControl";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatArea({ user }: { user: iUsers }) {
  return (
    <div className={s.chatArea}>
      <ChatControl user={user} />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
