import React, { useEffect, useRef, useState } from "react";
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
  faPen,
  faTrash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "store/API/postsAPI";
import Comments from "../Comments/Comments";
import { useAppSelector } from "hooks/redux";

function HomePost({ post }: { post: iPost }) {
  const user = useAppSelector((state) => state.user);
  const popupButtonRef = useRef<SVGSVGElement>(null);
  const [deletePost] = useDeletePostMutation();
  const [updatePost, { isError }] = useUpdatePostMutation();
  const [liked, setLiked] = useState<boolean>(post.liked.includes(user.id));
  const [sumLike, setSumLike] = useState<number>(post.likes);
  const [visibleHeaderPopup, setVisibleHeaderPopup] = useState<boolean>(false);
  const [editPost, setEditPost] = useState<boolean>(false);
  const [editPostValue, setEditPostValue] = useState<string>(post.text);

  const postObject = {
    id: post.id,
    likes: liked ? sumLike - 1 : sumLike + 1,
    liked: liked
      ? post.liked.filter((item) => item !== user.id)
      : [...post.liked, user.id],
    userId: post.userId,
    nickname: post.displayName,
    displayName: post.displayName,
    photoURL: post.photoURL,
    date: post.date,
    text: editPostValue,
    images: post.images,
  };

  const handleDeletePost = async () => {
    await deletePost(post.id).unwrap();
  };

  const handleUpdatePost = async () => {
    await updatePost(postObject as iPost).unwrap();
  };

  const handleLikeClick = () => {
    setLiked(!liked);
    setSumLike(liked ? sumLike - 1 : sumLike + 1);
    handleUpdatePost();
  };

  const calcInputHeight = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
      setEditPost(false);
      handleUpdatePost();
    }
  };

  const handleEditClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      commentArea: { value: string };
    };
    if (target.commentArea.value) {
      setEditPost(false);
      handleUpdatePost();
    }
  };

  const handleCancelEditClick = () => {
    setEditPost(!editPost);
    setEditPostValue(post.text);
  };

  const clickOutsidePopup = (e: MouseEvent) => {
    if (e.target !== popupButtonRef.current) {
      setVisibleHeaderPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutsidePopup);
    return () => {
      document.removeEventListener("click", clickOutsidePopup);
    };
  }, []);

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
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          ref={popupButtonRef}
          onClick={() => setVisibleHeaderPopup(!visibleHeaderPopup)}
        />
        <div className={clsx(s.postHeaderPopup, visibleHeaderPopup && s.show)}>
          <div onClick={handleDeletePost} className={s.postHeaderPopupItem}>
            <FontAwesomeIcon icon={faTrash} />
            <span>Delete</span>
          </div>
          <div
            onClick={() => setEditPost(!editPost)}
            className={s.postHeaderPopupItem}
          >
            <FontAwesomeIcon icon={faPen} />
            <span>Edit</span>
          </div>
        </div>
      </div>
      <div className={s.postBody}>
        <div className={s.postText}>
          {editPost ? (
            <form className={s.editComment} onSubmit={handleEditClick}>
              <textarea
                value={editPostValue}
                required
                name="commentArea"
                onFocus={calcInputHeight}
                onKeyUp={calcInputHeight}
                onChange={(e) => setEditPostValue(e.target.value)}
                autoFocus
              />
              <div className={s.editCommentButtons}>
                <button onClick={handleCancelEditClick}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          ) : (
            <p>{post.text}</p>
          )}
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
          className={clsx(s.icon, liked && s.liked)}
          onClick={handleLikeClick}
        >
          <FontAwesomeIcon icon={faHeart} />
          {sumLike === 0 ? "" : <span>{sumLike}</span>}
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
