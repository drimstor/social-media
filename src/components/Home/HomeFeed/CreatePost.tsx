import React, { useContext, useRef, useState } from "react";
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
import { CachedAvatarContext } from "contexts/CacheAvatarContextProvider";

function HomeCreatePost() {
  const [image, setImage] = useState<File | null>(null);
  const user = useAppSelector((state) => state.user);
  const { avatar } = useContext(CachedAvatarContext);
  const [addPost] = useAddPostMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      textarea: { value: string };
    };

    const text = target.textarea.value;

    if (!image && !text) return;

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (image) formData.append("file", image);
    if (text || image)
      await addPost(formData as FormData)
        .unwrap()
        .then(() => {
          target.textarea.value = "";
          if (textareaRef.current) textareaRef.current.style.height = "auto";
          setImage(null);
        });
  };

  const onChangeHandler = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className={s.createPost}>
      <div className={s.createPostBox}>
        <div className={clsx(s.postImage, user.avatar && s.bordered)}>
          {user.avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>
        <form className={s.addCommentForm} onSubmit={handleSubmit}>
          <textarea
            placeholder="Tell your friends about your thoughts..."
            name="textarea"
            onKeyUp={onChangeHandler}
            ref={textareaRef}
          />

          <input
            multiple={false}
            type="file"
            name="file"
            id="feedFile"
            accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .ico, .tiff, .bmp"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
          <label htmlFor="feedFile" className={clsx(image && s.imageAdded)}>
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
