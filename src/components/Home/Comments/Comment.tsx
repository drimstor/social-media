import React, { useState } from "react";
import clsx from "clsx";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faReply,
  faTrash,
  faTriangleExclamation,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { iComment } from "types/iPost";
import { useAppSelector } from "hooks/redux";
import ToolTip from "components/Helpers/ToolTip";
import { useDeleteCommentMutation } from "store/API/postsAPI";

function Comment({ comment }: { comment: iComment }) {
  const user = useAppSelector((state) => state.user);
  const [liked, setLiked] = useState<boolean>(false);
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    await deleteComment(comment.id).unwrap();
  };

  return (
    <>
      <div className={s.commentBox}>
        <div className={clsx(s.image, !comment.photoURL && s.withoutBorder)}>
          {comment.photoURL ? (
            <img src={comment.photoURL} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <div className={s.commentBody}>
          <h3>{comment.displayName}</h3>
          <p>{comment.text}</p>
          <div className={s.commentFooter}>
            <span>1 hrs ago</span>
            <div className={s.commentControlPanel}>
              <FontAwesomeIcon icon={faReply} />
              <div
                className={clsx(s.like, liked && s.liked)}
                onClick={() => setLiked(!liked)}
              >
                <FontAwesomeIcon icon={faHeart} />
                <p>2</p>
              </div>
            </div>
          </div>
          <div className={s.removeButton}>
            {comment.userId === user.id ? (
              <ToolTip title="Delete" reverse>
                <FontAwesomeIcon onClick={handleDeleteComment} icon={faTrash} />
              </ToolTip>
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
