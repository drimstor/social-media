import React, { useState } from "react";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "hooks/redux";
import ToolTip from "components/Helpers/ToolTip";
import clsx from "clsx";
import { useAddPostMutation } from "store/API/postsAPI";
import { iPost } from "types/iPost";

function HomeCreatePost() {
  const user = useAppSelector((state) => state.user);

  const [postText, setPostText] = useState<string>("");

  const [addPost, { isError }] = useAddPostMutation();

  const postObject = {
    userId: user.id,
    nickname: user.displayName,
    displayName: user.displayName,
    photoURL: user.photoURL,
    date: {
      nanoseconds: 30000,
      seconds: 20000,
    },
    text: postText,
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (postText) {
      await addPost(postObject as iPost).unwrap();
      setPostText("");
    }
  };

  return (
    <div className={s.createPost}>
      <div className={s.createPostBox}>
        <div className={clsx(s.postImage, user.photoURL && s.bordered)}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            required
            placeholder="Tell your friends about your thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />

          <input type="file" name="" id="feedFile" />
          <label htmlFor="feedFile">
            <ToolTip title="Photo" reverse>
              <FontAwesomeIcon icon={faImage} />
            </ToolTip>
          </label>

          <button type="submit">
            <ToolTip title="Post" reverse>
              <FontAwesomeIcon icon={faPaperPlane} />
            </ToolTip>
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomeCreatePost;
