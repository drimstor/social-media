import React from "react";
import s from "components/Home/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "hooks/redux";
import ToolTip from "components/Helpers/ToolTip";

function HomeCreatePost() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className={s.createPost}>
      <div className={s.createPostBox}>
        <div className={s.postImage}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <form>
          <textarea
            required
            placeholder="Tell your friends about your thoughts..."
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
