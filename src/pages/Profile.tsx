import React from "react";
import b from "components/SideBar/SideBar.module.scss";
import ProfileImage from "components/Profile/ProfileImage";
import ProfileInfo from "components/Profile/ProfileInfo";
import ProfileBlog from "components/Profile/ProfileBlog";
import s from "components/Profile/Profile.module.scss";

export default function Profile() {
  return (
    <div className={b.pageWrapper + " " + b.profile}>
      <ProfileImage />
      <div className={s.infoBox}>
        <ProfileInfo />
        <ProfileBlog />
      </div>
    </div>
  );
}
