import React from "react";
import s from "components/Home/Home.module.scss";
import { useSelector } from "react-redux";
import HomeActivityItem from "./HomeActivityItem";

export default function HomeActivity() {
  const user = useSelector((state: any) => state.user);
  return (
    <div className={s.recentActivity}>
      <h2>Recent activity</h2>
      <HomeActivityItem user={user} />
      <HomeActivityItem user={user} />
      <HomeActivityItem user={user} />
    </div>
  );
}
