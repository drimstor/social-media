import React from "react";
import s from "components/Home/Home.module.scss";
import HomeActivityItem from "./HomeActivityItem";
import { useAppSelector } from "hooks/redux";
import HomeUserInfo from "./HomeUserInfo";

export default function HomeActivity() {
  const user = useAppSelector((state) => state.user);

  return (
    <div className={s.temporalWrapper}>
      <HomeUserInfo />
      <div className={s.recentActivity}>
        <h2>Recent activity</h2>
        <HomeActivityItem user={user} />
        <HomeActivityItem user={user} />
      </div>
    </div>
  );
}
