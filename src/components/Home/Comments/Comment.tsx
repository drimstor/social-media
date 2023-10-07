import React, { useRef, useState } from "react";
import clsx from "clsx";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import { iComment } from "types/iPost";
import { useAppSelector } from "hooks/redux";
import ToolTip from "components/Helpers/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPen,
  faReply,
  faTrash,
  faTriangleExclamation,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "config";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "store/API/commentsAPI";
import { calculateTimeAgo } from "components/Helpers/calculateTimeAgo";

function Comment({ comment }: { comment: iComment }) {
  const user = useAppSelector((state) => state.user);
  const timeAgo = calculateTimeAgo(comment.date);
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment, { isLoading }] = useUpdateCommentMutation();
  const [isLiked, setIsLiked] = useState(comment.liked.includes(user.id));
  const [sumLike, setSumLike] = useState<number>(comment.liked.length);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editCommentValue, setEditCommentValue] = useState<string>(
    comment.text
  );

  const handleDeleteComment = async () => {
    await deleteComment(comment._id).unwrap();
  };
  const handleUpdateComment = async (isLike?: boolean) => {
    await updateComment({
      text: editCommentValue,
      id: String(comment._id),
      liked:
        isLike === undefined
          ? comment.liked
          : isLike
          ? comment.liked.filter((like) => like !== user.id)
          : [...comment.liked, user.id],
    } as { text: string; id: string; liked: string[] }).unwrap();
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setSumLike(isLiked ? sumLike - 1 : sumLike + 1);
    handleUpdateComment(comment.liked.includes(user.id));
  };

  const handleCancelEditClick = () => {
    setEditComment(!editComment);
    setEditCommentValue(comment.text);
  };

  const handleEditClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      commentArea: { value: string };
    };
    if (target.commentArea.value) {
      setEditComment(false);
      handleUpdateComment();
    }
  };

  const calcInputHeight = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
      setEditComment(false);
      handleUpdateComment();
    }
  };

  return (
    <>
      <div className={s.commentBox}>
        <div className={clsx(s.image, !comment.avatar && s.withoutBorder)}>
          {comment.avatar ? (
            <img src={API_URL + comment.avatar} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <div className={s.commentBody}>
          <h3>{comment.name}</h3>
          {editComment ? (
            <form className={s.editComment} onSubmit={handleEditClick}>
              <textarea
                value={editCommentValue}
                required
                name="commentArea"
                onFocus={calcInputHeight}
                onKeyUp={calcInputHeight}
                onChange={(e) => setEditCommentValue(e.target.value)}
                autoFocus
              />
              <div className={s.editCommentButtons}>
                <button onClick={handleCancelEditClick}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          ) : (
            <p>{comment.text}</p>
          )}
          {comment.image && (
            <img
              className={s.commentImage}
              src={API_URL + comment.image}
              alt="comment"
            />
          )}
          <div className={s.commentFooter}>
            <span>{timeAgo}</span>
            <div className={s.commentControlPanel}>
              <FontAwesomeIcon
                style={{ visibility: "hidden" }}
                icon={faReply}
              />
              <div
                className={clsx(s.like, isLiked && s.liked)}
                onClick={handleLikeClick}
              >
                <FontAwesomeIcon icon={faHeart} />
                <p>{sumLike === 0 ? " " : sumLike}</p>
              </div>
            </div>
          </div>
          <div className={s.removeButton}>
            {comment.user === user.id ? (
              <>
                <ToolTip title="Edit" reverse>
                  <FontAwesomeIcon
                    onClick={handleCancelEditClick}
                    icon={faPen}
                  />
                </ToolTip>
                <ToolTip title="Delete" reverse>
                  <FontAwesomeIcon
                    onClick={handleDeleteComment}
                    icon={faTrash}
                  />
                </ToolTip>
              </>
            ) : (
              <ToolTip title="Report" reverse>
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </ToolTip>
            )}
          </div>
        </div>
      </div>
      <div className={s.divider} />
    </>
  );
}

export default Comment;
