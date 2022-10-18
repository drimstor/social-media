import React from "react";
import s from "components/Home/Home.module.scss";
import { iUserState } from "types/iUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faTrash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

function HomeActivityItem({ user }: { user: iUserState }) {
  const [del, setDel] = React.useState(false);
  const item = React.useRef<HTMLDivElement>(null);

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
        {user.photoURL ? (
          <img src={user.photoURL} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <div className={s.box}>
        <h3>{user.displayName}</h3>
        <span>subscribed on you</span>
        <span className={s.color}>&#10625; 3 hrs ago</span>
        <div className={s.control}>
          <button>
            <FontAwesomeIcon icon={faHeart} />
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
