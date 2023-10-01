import React, { useRef, useState } from "react";
import s from "components/Home/Home.module.scss";
import { iUserState } from "types/iUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faTrash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { API_URL } from "config";

function HomeActivityItem({ user }: { user: iUserState }) {
  const [del, setDel] = useState(false);
  const [like, setLike] = useState(false);
  const item = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    setDel(true);
    setTimeout(() => item.current?.remove(), 350);
  };

  return (
    <div
      ref={item}
      className={
        del ? s.recentActivityItem + " " + s.delete : s.recentActivityItem
      }
    >
      <div className={s.image}>
        {user.avatar ? (
          <img src={API_URL + user.avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <div className={s.box}>
        <h3>{user.name}</h3>
        <span>subscribed on you</span>
        <span className={s.color}>&#10625; 3 hrs ago</span>
        <div className={s.control}>
          <button onClick={() => setLike(!like)}>
            <FontAwesomeIcon className={clsx(like && s.liked)} icon={faHeart} />
          </button>
          <button>
            <FontAwesomeIcon icon={faComment} />
          </button>
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeActivityItem;
