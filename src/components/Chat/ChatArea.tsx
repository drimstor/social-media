import { useAppSelector } from "hooks/redux";
import s from "./Chat.module.scss";
import ChatControl from "./ChatControl";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatArea({ socket }: any) {
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  return (
    <div className={s.chatArea}>
      {!selectedChat && <div className={s.chatAreaBanner} />}
      <ChatControl />
      <ChatMessages />
      <ChatInput socket={socket} />
    </div>
  );
}

export default ChatArea;
