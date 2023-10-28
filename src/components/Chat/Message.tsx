import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "hooks/redux";
import { iMessage } from "types/iMessage";
import { API_URL } from "config";
import { calculateTimeAgo } from "components/Helpers/calculateTimeAgo";
import useOpenUserProfile from "components/Helpers/openUserProfile";
import clsx from "clsx";
import { CachedAvatarContext } from "contexts/CacheAvatarContextProvider";
import { useContext } from "react";

export default function Message({ message }: { message: iMessage }) {
  const currentUser = useAppSelector((state) => state.user);
  const anotherUser = useAppSelector((state) => state.chat.user);
  const openUserProfile = useOpenUserProfile();
  const { avatar } = useContext(CachedAvatarContext);

  const currentUserMessage = currentUser.id === message.senderId;
  const anotherUserMessage = anotherUser.id === message.senderId;

  const openProfile = () => {
    openUserProfile({
      name: currentUserMessage ? currentUser.name : anotherUser.name,
      avatar: currentUserMessage
        ? currentUser.avatar ?? ""
        : anotherUser.avatar ?? "",
      id: message.senderId,
    });
  };

  return (
    <div className={clsx(s.message, currentUserMessage && s.owner)}>
      <div className={s.messageInfo} onClick={openProfile}>
        {anotherUserMessage &&
          (anotherUser.avatar ? (
            <img src={API_URL + anotherUser.avatar} alt="user avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          ))}

        {currentUserMessage &&
          (currentUser.avatar ? (
            <img src={avatar} alt="user avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          ))}

        <span>
          {currentUserMessage && currentUser.name}
          {anotherUserMessage && anotherUser.name}
        </span>
        <span>{calculateTimeAgo(message.date)}</span>
      </div>

      <div className={s.messageContent}>
        <div className={s.tail}></div>
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
