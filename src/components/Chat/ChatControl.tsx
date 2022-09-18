import React from "react";
import iUsers from "../../types/iUsers";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPhone,
  faUserCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../Helpers/ToolTip";

function ChatControl({ user }: { user: iUsers }) {
  return (
    <div className={s.control}>
      <div className={s.controlProfile}>
        {user.avatar ? (
          <img src={user.avatar} alt="Profile avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <h2>{user.name}</h2>
      </div>
      <div className={s.controlPanel}>
        <ToolTip title={"Call"} reverse>
          <FontAwesomeIcon icon={faPhone} />
        </ToolTip>
        <ToolTip title={"Add as friends"} reverse>
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
