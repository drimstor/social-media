import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function ChatNavBar() {
  return (
    <div className={s.nav}>
      <div className={s.navTitle}>
        <FontAwesomeIcon icon={faComments} /> <h2>Chats</h2>
      </div>
    </div>
  );
}

export default ChatNavBar;
