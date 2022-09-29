import React from "react";
import s from "./Chat.module.scss";
import ChatNavBar from "./ChatNavBar";
import ChatsUser from "./ChatsUser";
import iUsers from "types/iUsers";
import useMediaQuery from "hooks/useMediaQuery";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChatSideBarProps {
  users: iUsers[];
  setSelectChat: (index: number) => void;
  selectChat: number;
}

function ChatSideBar({ users, setSelectChat, selectChat }: ChatSideBarProps) {
  const matches = useMediaQuery("(max-width: 425px)");
  return (
    <div className={s.sidebar}>
      <ChatNavBar />
      <form>
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </form>
      <div className={s.users}>
        {users.map((user, index) => (
          <div
            style={{
              background:
                selectChat === index && !matches ? "rgba(0, 0, 0, 0.22)" : "",
            }}
            key={index}
            onClick={() => setSelectChat(index)}
          >
            <ChatsUser key={index} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSideBar;
