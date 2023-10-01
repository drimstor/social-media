import React, { useRef, useState } from "react";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import ToolTip from "components/Helpers/ToolTip";
import clsx from "clsx";
import { useAddPostMutation } from "store/API/postsAPI";
import { API_URL } from "config";
import { setShowSnackbar } from "store/slices/messageSlice";

function HomeCreatePost() {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(null);
  const user = useAppSelector((state) => state.user);
  const [addPost, { isError, error }] = useAddPostMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      textarea: { value: string };
      file: { files: any };
    };

    const text = target.textarea.value;
    const file = target.file.files[0];

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);
    if (text || file) await addPost(formData as FormData).unwrap();

    target.textarea.value = "";
  };

  const onChangeHandler = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  // if (isError) {
  //   dispatch(
  //     setShowSnackbar({
  //       variant: "fail",
  //       message: "sda",
  //     })
  //   );
  // }

  return (
    <div className={s.createPost}>
      <div className={s.createPostBox}>
        <div className={clsx(s.postImage, user.avatar && s.bordered)}>
          {user.avatar ? (
            <img src={API_URL + user.avatar} alt="avatar" />
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
