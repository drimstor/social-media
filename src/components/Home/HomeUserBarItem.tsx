import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { iUserState } from "types/iUser";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import clsx from "clsx";
import { API_URL } from "config";

interface HomeUserBarItemProps {
  user: iUserState;
  active?: boolean;
}

function HomeUserBarItem({ user, active }: HomeUserBarItemProps) {
  return (
    <>
      <div
        className={clsx(
          s.userBarItem,
          active && s.active,
          !user.avatar && s.circle
        )}
      >
        {user.avatar ? (
          <img src={API_URL + user.avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <h2>{user.name}</h2>
    </>
  );
}

export default HomeUserBarItem;
