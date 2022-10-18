import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "hooks/redux";
import { iMessage } from "types/iMessages";

export default function Message({ message }: { message: iMessage }) {
  const currentUser = useAppSelector((state) => state.user);
  const anotherUser = useAppSelector((state) => state.chat.user);
  const scrollElement = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   scrollElement.current?.scrollIntoView({
  //     // block: "end",
  //     // inline: "end",
  //     // behavior: "smooth",
  //   });
  // }, [message]);

  return (
    <>
      <div
        className={
          message.senderId === currentUser.id
            ? s.message + " " + s.owner
            : s.message
        }
      >
        <div className={s.messageInfo}>
          {anotherUser.photoURL == null &&
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

          <span>Just now</span>
        </div>
        <div className={s.messageContent}>
          <div className={s.tail}></div>
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
      <div ref={scrollElement}></div>
    </>
  );
}
