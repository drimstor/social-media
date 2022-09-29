import React from "react";
import s from "styles/authentication.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import BackdropLayout from "components/Layouts/BackdropLayout";

export default function Login() {
  return (
    <BackdropLayout>
      <div className={s.formWrapper}>
        <h1>Login</h1>

        <form>
        <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" required />
            <span>Email</span>
          </div>
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faLock} />
            <input type="password" required />
            <span>Password</span>
          </div>

          <button className="button" type="submit">
            Sing in
          </button>
        </form>
        <p>
          You don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </BackdropLayout>
  );
}
