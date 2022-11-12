import React from "react";
import Message from "./Message";
import s from "./Chat.module.scss";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useAppSelector } from "hooks/redux";
import { iMessage } from "types/iMessage";

function ChatMessages() {
  const db = getFirestore();
  const chatData = useAppSelector((state) => state.chat);
  const [messages, setMessages] = React.useState<iMessage[] | null>(null);
  const scrollElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatData.selectedChat) {
      const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [chatData.chatId]);

  React.useEffect(() => {
    setTimeout(
      () =>
        scrollElement.current?.scrollTo({
          behavior: "smooth",
          top: scrollElement.current?.scrollHeight,
        }),
      600
    );
  }, [messages]);

  return (
    <div ref={scrollElement} className={s.messages}>
      {messages !== null &&
        messages.map((message: iMessage) => (
          <Message message={message} key={message.id} />
        ))}
    </div>
  );
}

export default ChatMessages;
