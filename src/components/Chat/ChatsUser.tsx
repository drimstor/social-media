import s from "./Chat.module.scss";
import { iChat, iUser, iUserState } from "types/iUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "hooks/useMediaQuery";
import { useAppSelector } from "hooks/redux";
import { API_URL } from "config";

interface ChatsUserProps {
  chat: iChat | iUser | any;
  lastMessage?: string;
  onClick: (user: iChat | iUser | any) => void;
}

export default function ChatsUser({
  chat,
  lastMessage,
  onClick,
}: ChatsUserProps) {
  const selectChat = useAppSelector((state) => state.chat.selectedChat);
  const matches = useMediaQuery("(max-width:769px)");

  return (
    <div
      style={{
        background:
          (selectChat === chat._id || selectChat === chat.id) && !matches
            ? "rgba(0, 0, 0, 0.22)"
            : "",
      }}
    >
      <div
        className={s.userProfile}
        onClick={() => {
          onClick(chat);
        }}
      >
        {chat.avatar ? (
          <img src={API_URL + chat.avatar} alt="Profile avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <div className={s.userText}>
          <h3>{chat.name}</h3>
          <p>
            {lastMessage?.includes("<Image/> ") ? (
              <>
                <FontAwesomeIcon icon={faImage} /> {lastMessage?.slice(9)}
              </>
            ) : (
              lastMessage
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
