import React from "react";
import s from "components/Home/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSideBarIndex,
  selectSideBarItem,
} from "store/slices/sideBarSlice";

function HomeUserInfo() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickOnItem = () => {
    dispatch(selectSideBarItem("profile"));
    dispatch(selectSideBarIndex(1));
    navigate("/profile");
  };
  return (
    <div className={s.userInfo}>
      <div className={s.user}>
        <div className={s.image}>
          <div className={s.follow}>
            <span>100</span>
            <p>Followers</p>
          </div>
          <img src={user.photoURL} alt="avatar" />
          <div className={s.follow}>
            <span>100</span>
            <p>Following</p>
          </div>
        </div>
        <div className={s.info}>
          <h2>{user.displayName}</h2>
          <span>@username</span>
          <p>Something tell about yourself...</p>
          <div className={s.border}></div>
          <button onClick={clickOnItem}>My Profile</button>
        </div>
      </div>
    </div>
  );
}

export default HomeUserInfo;
