import { useAppSelector } from "hooks/redux";
import React from "react";
import s from "components/Home/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEllipsisVertical,
  faHeart,
  faImage,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import approval from "img/approval.png";

import house from "img/house3d.png";
import clsx from "clsx";
import ToolTip from "components/Helpers/ToolTip";

function HomePost({ img }: { img: string }) {
  const user = useAppSelector((state) => state.user);
  const [like, setLike] = React.useState<boolean>(false);
  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <div className={s.image}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <div className={s.postInfo}>
          <div className={s.nickname}>
            @nickname <img src={approval} alt="approval" />
          </div>
          <div className={s.name}>
            {user.displayName} <span>⦁ 1 hrs ago</span>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      <div className={s.postBody}>
        <div className={s.postText}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis laudantium natus tempore quaerat in soluta dolorum
            impedit ad excepturi possimus explicabo esse.
          </p>
        </div>
        <div className={s.postImages}>
          <img src={img} alt="post" />
        </div>
      </div>
      <div className={s.controlPanel}>
        <div
          className={clsx(s.icon, like && s.liked)}
          onClick={() => setLike(!like)}
        >
          <FontAwesomeIcon icon={faHeart} /> <span>5</span>
        </div>
        <div className={s.icon}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        <div className={s.icon}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
      </div>
      <div className={s.divider} />
      <div className={s.postComment}>
        <div className={s.image}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <form>
          <textarea required placeholder="Write your comment" />

          <input type="file" name="" id="feedFile" />
          <label htmlFor="feedFile">
            <ToolTip title="Photo" reverse>
              <FontAwesomeIcon icon={faImage} />
            </ToolTip>
          </label>

          <button type="submit">
            <ToolTip title="Сomment" reverse>
              <FontAwesomeIcon icon={faPaperPlane} />
            </ToolTip>
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePost;
