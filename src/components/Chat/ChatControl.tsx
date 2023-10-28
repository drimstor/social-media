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
import { API_URL } from "config";
import useOpenUserProfile from "components/Helpers/openUserProfile";

function ChatControl() {
  const user = useAppSelector((state) => state.chat.user);
  const openUserProfile = useOpenUserProfile();

  const openProfile = () => {
    openUserProfile({
      name: user.name,
      avatar: user.avatar ?? "",
      id: user.id,
    });
  };

  return (
    <div className={s.control}>
      <div className={s.controlProfile} onClick={openProfile}>
        {user && user.avatar ? (
          <img src={API_URL + user.avatar} alt="Profile avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
        <h2>{user && user.name}</h2>
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
