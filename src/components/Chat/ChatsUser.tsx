import React from "react";
import s from "./Chat.module.scss";
import { iUsers } from "types/iUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

interface ChatsUserProps {
  chat: any;
  onClick: any;
}

export default function ChatsUser({ chat, onClick }: ChatsUserProps) {
  return (
    <div
      className={s.userProfile}
      onClick={() => {
        onClick(chat[1].userInfo);
      }}
    >
      {chat[1].userInfo.photoURL ? (
        <img src={chat[1].userInfo.photoURL} alt="Profile avatar" />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} />
      )}
      <div className={s.userText}>
        <h3>{chat[1].userInfo.displayName}</h3>
        <p>{chat[1].userInfo.lastMessage?.text}</p>
      </div>
    </div>
  );
}
