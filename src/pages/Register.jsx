import React from "react";
import s from "styles/authentication.module.scss";
import BackdropLayout from "components/Layouts/BackdropLayout";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileImage,
  faLock,
  faLockOpen,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [error, setError] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];
  };
  return (
    <BackdropLayout>
      <div className={s.formWrapper}>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faUser} />
            <input type="text" required />
            <span>Display Name</span>
          </div>
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
          <div className={s.inputWrapper}>
            <FontAwesomeIcon icon={faLockOpen} />
            <input type="password" required />
            <span>Confirm Password</span>
          </div>

          <input type="file" id="file" />
          <label htmlFor="file">
            <FontAwesomeIcon icon={faFileImage} />
            <span>Add an avatar</span>
          </label>

          <button className="button" type="submit">
            Register
          </button>
          {/* {error && (
          <p className={s.error}>
            <FontAwesomeIcon icon={faTriangleExclamation} /> Something went
            wrong
          </p>
          )} */}
        </form>
        <p>
          You do have an account? <a href="/login">Login</a>
        </p>
      </div>
    </BackdropLayout>
  );
}
