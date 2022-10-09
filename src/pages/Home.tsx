import React from "react";
import b from "components/SideBar/SideBar.module.scss";
import s from "components/Home/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import HomeActivity from "components/Home/HomeActivity";
import HomeUserInfo from "components/Home/HomeUserInfo";

export default function Home() {
  return (
    <div className={b.pageWrapper + " " + b.home}>
      <HomeUserInfo />
      <div className={s.feed}></div>
      <HomeActivity />
    </div>
  );
}
