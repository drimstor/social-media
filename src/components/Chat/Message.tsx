import React from "react";
import s from "./Chat.module.scss";
import avatar from "img/ZC5B45PbR1I.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Message({}) {
  return (
    <div className={s.message + " " + s.owner}>
      <div className={s.messageInfo}>
        {avatar ? (
          <img src={avatar} alt="user avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <span>Just now</span>
      </div>
      <div className={s.messageContent}>
        <div className={s.tail}></div>
        <p>hello</p>
        {/* <img src={avatar} alt="" /> */}
      </div>
    </div>
  );
}

export default Message;
