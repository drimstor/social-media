import React from "react";
import s from "./Chat.module.scss";
import iUsers from "../../types/iUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function ChatsUser({ user }: { user: iUsers }) {
  return (
    <div className={s.userProfile}>
      {user.avatar ? (
        <img src={user.avatar} alt="Profile avatar" />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} />
      )}
      <div className={s.userText}>
        <h3>{user.name}</h3>
        <p>{user.message}</p>
      </div>
    </div>
  );
}
