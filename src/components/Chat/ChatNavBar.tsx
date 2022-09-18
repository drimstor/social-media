import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ChatNavBar() {
  return (
    <div className={s.nav}>
      <div className={s.navTitle}>
        <FontAwesomeIcon icon={faComments} /> <h2>Chats</h2>
        {/* <FontAwesomeIcon icon={faPaperPlane} />  */}
      </div>
    </div>
  );
}

export default ChatNavBar;
