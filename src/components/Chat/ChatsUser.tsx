import React from "react";
import s from "./Chat.module.scss";
import { iUserState } from "types/iUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "hooks/useMediaQuery";
import { useAppSelector } from "hooks/redux";

interface iUser extends iUserState {
  lastMessage?: {
    text?: string;
  };
}

interface ChatsUserProps {
  chatUser: iUser;
  onClick: (user: iUser) => void;
}

export default function ChatsUser({ chatUser, onClick }: ChatsUserProps) {
  const selectChat = useAppSelector((state) => state.chat.selectedChat);
  const matches = useMediaQuery("(max-width: 425px)");
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
        {chatUser.photoURL ? (
          <img src={chatUser.photoURL} alt="Profile avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <div className={s.userText}>
          <h3>{chatUser.displayName}</h3>
          <p>{chatUser.lastMessage?.text}</p>
        </div>
      </div>
    </div>
  );
}
