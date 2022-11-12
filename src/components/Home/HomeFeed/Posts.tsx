import React from "react";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import HomePost from "./Post";
import { iPost } from "types/iPost";

function HomePosts({ data }: { data: iPost[] }) {
  return (
    <div className={s.postsBox}>
      {data &&
        data.map((item) => <HomePost key={item.id} post={item} />).reverse()}
    </div>
  );
}

export default HomePosts;
