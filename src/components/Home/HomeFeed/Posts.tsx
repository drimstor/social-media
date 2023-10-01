import React from "react";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import HomePost from "./Post";
import { iPost } from "types/iPost";

function HomePosts({ data }: { data: iPost[] }) {
  return (
    <div className={s.postsBox}>
      {data && data.map((item, index) => <HomePost key={index} post={item} />)}
    </div>
  );
}

export default HomePosts;
