import React from "react";
import s from "../styles/authentication.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  return (
    <div className={s.backdrop}>
      <div className={s.formWrapper}>
        <h1>Registration</h1>
        {/* <FontAwesomeIcon icon={faCoffee} pull="left" /> */}
        <form>
          <input type="text" placeholder="display name" required />
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <input type="password" placeholder="confirm password" required />
          <input type="file" />
          <button type="submit">Register</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
}
