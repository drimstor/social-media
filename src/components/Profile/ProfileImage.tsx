import React from "react";
import s from "./Profile.module.scss";
import avatar from "img/RyN8L_hN83A.png";
import avatar2 from "img/ZC5B45PbR1I.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import flag from "img/flag-russia.svg";

function ProfileImage() {
  return (
    <div className={s.profileImage}>
      <div className={s.image}>
        {!true ? (
          <img src={avatar} alt="Profile Image" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <div className={s.information}>
        <h1>User Name</h1>
        <div className={s.location}>
          <img src={flag} alt="flag" /> Russia, Krasnodar
        </div>
        <div className={s.profession}>UX/UI design</div>
        <div className={s.followingBox}>
          <div className={s.followingItem}>
            <span>100</span>
            <p>Posts</p>
          </div>
          <div className={s.followingItem + ' ' + s.followingBorder}>
            <span>100</span>
            <p>Followers</p>
          </div>
          <div className={s.followingItem}>
            <span>100</span>
            <p>Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
