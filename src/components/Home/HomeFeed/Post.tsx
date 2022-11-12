import React from "react";
import clsx from "clsx";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import approval from "img/approval.png";
import { iPost } from "types/iPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEllipsisVertical,
  faHeart,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDeletePostMutation } from "store/API/postsAPI";
import Comments from "../Comments/Comments";

function HomePost({ post }: { post: iPost }) {
  const [like, setLike] = React.useState<boolean>(false);

  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    await deletePost(post.id).unwrap();
  };

  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <div className={clsx(s.image, !post.photoURL && s.bordered)}>
          {post.photoURL ? (
            <img src={post.photoURL} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <div className={s.postInfo}>
          <div className={s.nickname}>
            @nickname <img src={approval} alt="approval" />
          </div>
          <div className={s.name}>
            {post.displayName} <span>⦁ 1 hrs ago</span>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleDeletePost} />
      </div>
      <div className={s.postBody}>
        <div className={s.postText}>
          <p>{post.text}</p>
        </div>
        <div className={s.postImages}>
          {post.images &&
            post.images.map((image, index) => (
              <img src={image} key={index} alt="post" />
            ))}
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
      <Comments post={post} />
    </div>
  );
}

export default HomePost;
