import React, { useCallback, useEffect, useRef } from "react";
import s from "components/Home/Home.module.scss";
import { useAppSelector } from "hooks/redux";
import HomeUsersSlider from "./HomeUsersSlider";
import HomeCreatePost from "./HomeCreatePost";
import HomePosts from "./HomePosts";

function HomeFeed() {
  const user = useAppSelector((state) => state.user);
  const oldScroll = useRef<HTMLDivElement | any>(null);
  const newScroll = useRef<HTMLDivElement | any>(null);
  const newScrollContent = useRef<HTMLDivElement | any>(null);

  const handleScroll = useCallback(() => {
    newScroll.current.scrollTop = oldScroll.current?.scrollTop;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      newScrollContent.current.style.height =
        oldScroll.current.scrollHeight + "px";
    }, 100);
  }, [handleScroll]);

  return (
    <div ref={oldScroll} onScroll={handleScroll} className={s.feed}>
      <HomeUsersSlider />
      <HomeCreatePost />
      <HomePosts />
      <div ref={newScroll} onScroll={handleScroll} className={s.scrollBar}>
        <div ref={newScrollContent} />
      </div>
    </div>
  );
}

export default HomeFeed;
