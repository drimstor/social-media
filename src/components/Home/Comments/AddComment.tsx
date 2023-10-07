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
import { API_URL } from "config";
import { useAddCommentMutation } from "store/API/commentsAPI";

function AddComment({ postId }: { postId: string }) {
  const user = useAppSelector((state) => state.user);
  const [addComment] = useAddCommentMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      textarea: { value: string };
    };

    const text = target.textarea.value;

    if (!image && !text) return;

    const formData = new FormData();
    formData.append("postId", String(postId));
    if (text) formData.append("text", text);
    if (image) formData.append("file", image);
    if (text || image) {
      await addComment(formData as FormData)
        .unwrap()
        .then(() => {
          target.textarea.value = "";
          if (textareaRef.current) textareaRef.current.style.height = "auto";
          setImage(null);
        });
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
          name="textarea"
          placeholder="Write your comment"
          onKeyUp={onChangeHandler}
          ref={textareaRef}
        />
        <input
          multiple={false}
          type="file"
          name="file"
          id="commentFile"
          accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .ico, .tiff, .bmp"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />
        <label htmlFor="commentFile" className={clsx(image && s.imageAdded)}>
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
