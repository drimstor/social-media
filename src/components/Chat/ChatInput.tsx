import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../Helpers/ToolTip";

export default function ChatInput() {
  return (
    <div className={s.MainInput}>
      <form>
        <input type="text" placeholder="Type something..." />
        <input type="file" id="file2" />

        <label htmlFor="file2">
          <ToolTip title={"Add file"} reverse>
            <FontAwesomeIcon icon={faFile} />
          </ToolTip>
        </label>

        <input type="file" id="photo" />
        <label htmlFor="photo">
          <ToolTip title={"Add photo"} reverse>
            <FontAwesomeIcon icon={faFileImage} />
          </ToolTip>
        </label>

        <button>
          <span>Send</span> <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
