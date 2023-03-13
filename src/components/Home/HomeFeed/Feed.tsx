import React, { useCallback, useEffect, useRef, useState } from "react";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import HomeUsersSlider from "./UsersSlider";
import HomeCreatePost from "./CreatePost";
import HomePosts from "./Posts";
import { useGetPostsQuery } from "store/API/postsAPI";

function HomeFeed() {
  const oldScroll = useRef<HTMLDivElement | any>(null);
  const newScroll = useRef<HTMLDivElement | any>(null);
  const newScrollContent = useRef<HTMLDivElement | any>(null);

  const { data = [], isLoading } = useGetPostsQuery(5);

  console.log(data);
  

  const handleScroll = () => {
    newScroll.current.scrollTop = oldScroll.current?.scrollTop;
  };

  const timeoutHandleScroll = () => {
    setTimeout(() => {
      newScrollContent.current.style.height =
        oldScroll.current.scrollHeight + "px";
    }, 1000);
  };

  useEffect(() => {
    timeoutHandleScroll();
  }, [data]);

  return (
    <div ref={oldScroll} onScroll={handleScroll} className={s.feed}>
      <HomeUsersSlider />
      <HomeCreatePost />
      <HomePosts data={data} />
      <div ref={newScroll} onScroll={handleScroll} className={s.scrollBar}>
        <div ref={newScrollContent} />
      </div>
    </div>
  );
}

export default HomeFeed;
