import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useAppSelector } from "hooks/redux";
import React from "react";
import { iMessage } from "types/iMessages";
import s from "./Chat.module.scss";
import Message from "./Message";

function ChatMessages() {
  const db = getFirestore();
  const chatData = useAppSelector((state) => state.chat);
  const [messages, setMessages] = React.useState<iMessage[] | null>(null);

  React.useEffect(() => {
    if (chatData.user) {
      const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [chatData.chatId]);

  return (
    <div className={s.messages}>
      {messages !== null &&
        messages.map((message: iMessage) => (
          <Message message={message} key={message.id} />
        ))}
    </div>
  );
}

export default ChatMessages;
