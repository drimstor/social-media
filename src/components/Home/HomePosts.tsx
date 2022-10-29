import React from "react";
import s from "components/Home/Home.module.scss";
import HomePost from "./HomePost";
import house from "img/house3d.png";
import postImg from "img/postimage.png";

function HomePosts() {
  return (
    <div className={s.postsBox}>
      <HomePost img={postImg} />
      <HomePost img={house} />
    </div>
  );
}

export default HomePosts;
