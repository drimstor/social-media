import React from "react";
import b from "components/SideBar/SideBar.module.scss";
import HomeActivity from "components/Home/HomeActivity";
import HomeUserInfo from "components/Home/HomeUserInfo";
import HomeFeed from "components/Home/HomeFeed";

export default function Home() {
  return (
    <div className={b.pageWrapper + " " + b.home}>
      <HomeUserInfo />
      <HomeFeed />
      <HomeActivity />
    </div>
  );
}
