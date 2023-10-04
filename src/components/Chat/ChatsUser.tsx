import s from "./Chat.module.scss";
import { iUserState } from "types/iUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "hooks/useMediaQuery";
import { useAppSelector } from "hooks/redux";

interface ChatsUserProps {
  chatUser: iUserState;
  lastMessage?: {
    text?: string;
  };
  onClick: (user: iUserState) => void;
}

export default function ChatsUser({
  chatUser,
  lastMessage,
  onClick,
}: ChatsUserProps) {
  const selectChat = useAppSelector((state) => state.chat.selectedChat);
  const matches = useMediaQuery("(max-width:769px)");
  return (
    <div
      style={{
        background:
          selectChat === chatUser.id && !matches ? "rgba(0, 0, 0, 0.22)" : "",
      }}
    >
      <div
        className={s.userProfile}
        onClick={() => {
          onClick(chatUser);
        }}
      >
        {chatUser.avatar ? (
          <img src={chatUser.avatar} alt="Profile avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <div className={s.userText}>
          <h3>{chatUser.name}</h3>
          <p>{lastMessage?.text}</p>
        </div>
      </div>
    </div>
  );
}
