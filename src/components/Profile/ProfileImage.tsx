import React from "react";
import s from "./Profile.module.scss";
import flag from "img/flag-russia.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "hooks/redux";
import { API_URL } from "config";

export default function ProfileImage() {
  const user = useAppSelector((state) => state.user);

  return (
    <div className={s.profileImage}>
      <div className={s.image}>
        {user.photoURL ? (
          <img src={API_URL + user.photoURL} alt="Profile" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <div className={s.information}>
        <h1>{user.displayName}</h1>
        <span className={s.nickName}>@nickname</span>
        <div className={s.location}>
          <img src={flag} alt="flag" /> Russia, Krasnodar
        </div>
        <div className={s.profession}>UX/UI design</div>
        <div className={s.description}>Something tell about yourself...</div>
        <div className={s.followBox}>
          <div className={s.followingBox}>
            <div className={s.followingItem}>
              <span>100</span>
              <p>Followers</p>
            </div>
            <div className={s.followingBorder} />
            <div className={s.followingItem}>
              <span>100</span>
              <p>Posts</p>
            </div>
            <div className={s.followingBorder} />
            <div className={s.followingItem}>
              <span>100</span>
              <p>Following</p>
            </div>
          </div>
          <div className={s.buttons}>
            <button>Follow</button>
            <button>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
