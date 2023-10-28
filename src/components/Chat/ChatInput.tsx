import React, { useState } from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "../Helpers/ToolTip";
import { useAppSelector } from "hooks/redux";
import { v4 as uuid } from "uuid";
import {
  faFileArrowUp,
  faFileImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  useChangeUsersPreviewMutation,
  useSendMessageMutation,
} from "store/API/chatApi";

export default function ChatInput({ socket }: any) {
  const currentUser = useAppSelector((state) => state.user);
  const anotherUser = useAppSelector((state) => state.chat.user);
  const [sendMessage] = useSendMessageMutation();
  const [changeUsersPreview] = useChangeUsersPreviewMutation();
  const [img, setImg] = useState<File | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      textarea: { value: string };
    };

    const text = target.textarea.value;

    if (!img && !text) return;

    const formData = new FormData();
    formData.append("recipientId", String(anotherUser.id));
    if (text) formData.append("text", text);
    if (img) formData.append("file", img);
    if (text || img) {
      await sendMessage(formData as FormData)
        .unwrap()
        .then(() => {
          changeUsersPreview({
            senderId: currentUser.id,
            recipientId: anotherUser.id,
            text: `${img ? "<Image/> " : ""}${text ?? ""}`,
          });
          if (socket) {
            socket.emit("new-message", {
              name: currentUser.name,
              id: currentUser.id,
              avatar: currentUser.avatar,
              recipientId: anotherUser.id,
              message: `${img ? "<Image/> " : ""}${text ?? ""}`,
            });
          }
          target.textarea.value = "";
          setImg(null);
        });
    }
  };

  return (
    <div className={s.MainInput}>
      <form onSubmit={handleSubmit}>
        <textarea name="textarea" placeholder="Type something..." />

        <input
          multiple={false}
          type="file"
          name="file"
          id="photo"
          accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .ico, .tiff, .bmp"
          onChange={(e) => e.target.files && setImg(e.target.files[0])}
        />

        <label htmlFor="photo">
          <ToolTip title={"Photo"} reverse>
            {img ? (
              <FontAwesomeIcon icon={faFileArrowUp} className={s.fileIcon} />
            ) : (
              <FontAwesomeIcon icon={faFileImage} />
            )}
          </ToolTip>
        </label>

        {/* {img && (
          <div className={s.progressLoading}>
            <div
              style={{ width: `${loading}%` }}
              className={s.progressLoadingBar}
            />
            {errorMessage && <span>Error</span>}
          </div>
        )} */}

        <button type="submit">
          <span>Send</span> <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
