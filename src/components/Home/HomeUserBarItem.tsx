import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { iUserState } from "types/iUsers";
import s from "components/Home/Home.module.scss";
import clsx from "clsx";

interface HomeUserBarItemProps {
  user: iUserState;
  active?: boolean;
}

function HomeUserBarItem({ user, active }: HomeUserBarItemProps) {
  return (
    <>
      <div className={clsx(s.userBarItem, active && s.active)}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <h2>{user.displayName}</h2>
    </>
  );
}

export default HomeUserBarItem;
