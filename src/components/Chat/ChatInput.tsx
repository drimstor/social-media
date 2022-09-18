import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileImage } from "@fortawesome/free-solid-svg-icons";

export default function ChatInput() {
  return (
    <div className={s.input}>
      <form>
        <input type="text" placeholder="Type something..." />
        <input type="file" id="file2" />
        <label htmlFor="file2">
          <FontAwesomeIcon icon={faFile} />
        </label>
        <input type="file" id="photo" />
        <label htmlFor="photo">
          <FontAwesomeIcon icon={faFileImage} />
        </label>
        <button className="button">Send</button>
      </form>
    </div>
  );
}
