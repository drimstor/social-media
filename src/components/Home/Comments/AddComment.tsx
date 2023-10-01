import React, { useRef, useState } from "react";
import clsx from "clsx";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import { useAppSelector } from "hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "components/Helpers/ToolTip";
import {
  faImage,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { iComment, iPost } from "types/iPost";
import { useAddCommentMutation } from "store/API/postsAPI";
import { API_URL } from "config";

function AddComment({ post }: { post: iPost }) {
  const user = useAppSelector((state) => state.user);
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [commentText, setCommentText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const commentObject = {
    userId: user.id,
    postId: post.id,
    name: user.name,
    avatar: user.avatar,
    date: {
      nanoseconds: 30000,
      seconds: 20000,
    },
    text: commentText,
    likes: 0,
    liked: [""],
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (commentText) {
      await addComment(commentObject as iComment).unwrap();
      setCommentText("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }
  };

  const onChangeHandler = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className={s.postComment}>
      <div className={clsx(s.image, !user.avatar && s.withoutBorder)}>
        {user.avatar ? (
          <img src={API_URL + user.avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <form className={s.addCommentForm} onSubmit={handleSubmit}>
        <textarea
          required
          placeholder="Write your comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyUp={onChangeHandler}
          ref={textareaRef}
        />
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
  );
}

export default AddComment;
