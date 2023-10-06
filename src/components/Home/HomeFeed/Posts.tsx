import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import HomePost from "./Post";
import { iPost } from "types/iPost";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

function HomePosts({ data }: { data: iPost[] }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.9,
    delay: 2000,
  });
  return (
    <div className={s.postsBox}>
      {data && data.map((item) => <HomePost key={item._id} post={item} />)}
      {!!data.length && (
        <span ref={ref} className={clsx(inView && s.active)}>
          It's Over 😁
        </span>
      )}
    </div>
  );
}

export default HomePosts;
