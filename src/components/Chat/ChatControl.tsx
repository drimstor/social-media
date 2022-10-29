import React from "react";
import s from "./Chat.module.scss";
import ToolTip from "../Helpers/ToolTip";
import { useAppSelector } from "hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPhone,
  faUserCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function ChatControl() {
  const user = useAppSelector((state) => state.chat.user);
  return (
    <div className={s.control}>
      <div className={s.controlProfile}>
        {user && user.photoURL ? (
          <img src={user.photoURL} alt="Profile avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <h2>{user && user.displayName}</h2>
      </div>
      <div className={s.controlPanel}>
        <ToolTip title={"Call"} reverse>
          <FontAwesomeIcon icon={faPhone} />
        </ToolTip>
        <ToolTip title={"Follow"} reverse>
          <FontAwesomeIcon icon={faUserPlus} />
        </ToolTip>
        <ToolTip title={"More"} reverse>
          <FontAwesomeIcon icon={faEllipsis} />
        </ToolTip>
      </div>
    </div>
  );
}

export default ChatControl;
