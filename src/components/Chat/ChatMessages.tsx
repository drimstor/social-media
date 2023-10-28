import React from "react";
import Message from "./Message";
import s from "./Chat.module.scss";
import { useAppSelector } from "hooks/redux";
import { iMessage } from "types/iMessage";
import { useGetMessagesQuery } from "store/API/chatApi";

function ChatMessages() {
  const currentUser = useAppSelector((state) => state.user);
  const anotherUser = useAppSelector((state) => state.chat.user);

  const scrollElement = React.useRef<HTMLDivElement>(null);

  const { data = [] } = useGetMessagesQuery({
    limit: 9,
    senderId: currentUser.id,
    recipientId: anotherUser.id,
  });

  React.useEffect(() => {
    setTimeout(
      () =>
        scrollElement.current?.scrollTo({
          behavior: "smooth",
          top: scrollElement.current?.scrollHeight,
        }),
      600
    );
  }, [data]);

  return (
    <div ref={scrollElement} className={s.messages}>
      {data !== null &&
        data.map((message: iMessage) => (
          <Message message={message} key={message._id} />
        ))}
    </div>
  );
}

export default ChatMessages;
