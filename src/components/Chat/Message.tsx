import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "hooks/redux";
import { iMessage } from "types/iMessage";

export default function Message({ message }: { message: iMessage }) {
  const currentUser = useAppSelector((state) => state.user);
  const anotherUser = useAppSelector((state) => state.chat.user);

  const fireBaseTime = new Date(
    message.date.seconds * 1000 + message.date.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString().slice(0, 5);
  const newDate = date.split(" ").reverse().splice(1, 2).join(" ");

  return (
    <div
      className={
        message.senderId === currentUser.id
          ? s.message + " " + s.owner
          : s.message
      }
    >
      <div className={s.messageInfo}>
        {anotherUser.photoURL === null &&
          anotherUser.id === message.senderId && (
            <FontAwesomeIcon icon={faUserCircle} />
          )}

        {anotherUser.photoURL !== null &&
          anotherUser.id === message.senderId && (
            <img src={anotherUser.photoURL} alt="user avatar" />
          )}

        {currentUser.photoURL == null &&
          currentUser.id === message.senderId && (
            <FontAwesomeIcon icon={faUserCircle} />
          )}

        {currentUser.photoURL !== null &&
          currentUser.id === message.senderId && (
            <img src={currentUser.photoURL} alt="user avatar" />
          )}

        <span>
          {currentUser.id === message.senderId && currentUser.displayName}
          {anotherUser.id === message.senderId && anotherUser.displayName}
        </span>
        <span>{atTime}</span>
      </div>

      <div className={s.messageContent}>
        <div className={s.tail}></div>
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
