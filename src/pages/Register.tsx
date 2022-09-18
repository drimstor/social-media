import React from "react";
import s from "../styles/authentication.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileImage,
  faLock,
  faLockOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  return (
    <div className={s.backdrop}>
      <div className={s.formWrapper}>
        <h1>Registration</h1>

        <form>
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faUser} />
            <input type="text" placeholder="display name" required />
          </div>
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" placeholder="email" required />
          </div>
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faLock} />
            <input type="password" placeholder="password" required />
          </div>
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faLockOpen} />
            <input type="password" placeholder="confirm password" required />
          </div>

          <input type="file" id="file" />
          <label htmlFor="file">
            <FontAwesomeIcon icon={faFileImage} />
            <span>Add an avatar</span>
          </label>

          <button className="button" type="submit">
            Register
          </button>
        </form>
        <p>
          You do have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
