import React from "react";
import iUsers from "../../types/iUsers";
import s from "./Chat.module.scss";
import ChatControl from "./ChatControl";
import ChatInput from "./ChatInput";

function ChatArea({ user }: { user: iUsers }) {
  return (
    <div className={s.chatArea}>
      <ChatControl user={user} />

      <ChatInput />
    </div>
  );
}

export default ChatArea;
