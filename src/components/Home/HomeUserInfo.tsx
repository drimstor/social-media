import React from "react";
import s from "components/Home/Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  selectSideBarIndex,
  selectSideBarItem,
} from "store/slices/sideBarSlice";
import { API_URL } from "config";

function HomeUserInfo() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clickOnItem = () => {
    dispatch(selectSideBarItem("profile"));
    dispatch(selectSideBarIndex(1));
    navigate("/profile");
  };

  return (
    <div className={s.userInfo}>
      <div className={s.user}>
        <div
          style={{ borderColor: user.avatar ? "undefined" : "transparent" }}
          className={s.image}
        >
          <div className={s.follow}>
            <span>100</span>
            <p>Followers</p>
          </div>
          {user.avatar ? (
            <img src={API_URL + user.avatar} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
          <div className={s.follow}>
            <span>100</span>
            <p>Following</p>
          </div>
        </div>
        <div className={s.info}>
          <h2>{user.name}</h2>
          <span>@username</span>
          <div className={s.border}></div>
          <button onClick={clickOnItem}>My Profile</button>
        </div>
      </div>
    </div>
  );
}

export default HomeUserInfo;
