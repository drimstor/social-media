import React, { useContext } from "react";
import s from "./Profile.module.scss";
import flag from "img/flag-russia.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { API_URL } from "config";
import { useNavigate } from "react-router-dom";
import { changeUser } from "store/slices/chatSlice";
import {
  selectSideBarIndex,
  selectSideBarItem,
} from "store/slices/sideBarSlice";
import { CachedAvatarContext } from "contexts/CacheAvatarContextProvider";

export default function ProfileImage() {
  const user = useAppSelector((state) => state.user);
  const { avatar } = useContext(CachedAvatarContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openChat = () => {
    if (user.anotherUserProfile) {
      dispatch(
        changeUser({
          avatar: user.anotherUserProfile.avatar ?? "",
          name: user.anotherUserProfile.name,
          id: user.anotherUserProfile.id ?? "",
          chatId: user.id + user.anotherUserProfile.id,
        })
      );
      dispatch(selectSideBarItem("chats"));
      dispatch(selectSideBarIndex(2));
      navigate("/chats");
    }
  };

  return (
    <div className={s.profileImage}>
      <div className={s.image}>
        {user.anotherUserProfile ? (
          user.anotherUserProfile?.avatar ? (
            <img
              src={API_URL + user.anotherUserProfile?.avatar}
              alt="Profile"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )
        ) : user.avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <div className={s.information}>
        <h1>{user.anotherUserProfile?.name ?? user.name}</h1>

        <div className={s.infoBoxWrapper}>
          <span className={s.nickName}>@nickname</span>
          <div className={s.location}>
            <img src={flag} alt="flag" /> Russia, Krasnodar
          </div>
          <div className={s.profession}>UX/UI design</div>
          <div className={s.description}>Something tell about yourself...</div>
        </div>

        <div className={s.followBox}>
          <div className={s.followingBox}>
            <div className={s.followingItem}>
              <span>100</span>
              <p>Followers</p>
            </div>

            <div className={s.followingItem}>
              <div className={s.followingBorder} />
              <span>100</span>
              <p>Posts</p>
              <div className={s.followingBorder} />
            </div>

            <div className={s.followingItem}>
              <span>100</span>
              <p>Following</p>
            </div>
          </div>
          <div className={s.buttons}>
            <button>Follow</button>
            <button onClick={openChat}>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
