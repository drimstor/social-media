import React from "react";
import s from "styles/authentication.module.scss";
import BackdropLayout from "components/Layouts/BackdropLayout";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    //Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);
    //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              displayName,
              photoURL: downloadURL,
              email,
              id: res.user.uid,
            });
            // Redux
            dispatch(
              setUser({
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                email: res.user.email,
                id: res.user.uid,
              })
            );
            // Redirect
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
          }
        });
      }
    );
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
          {error && (
            <p className={s.error}>
              <FontAwesomeIcon icon={faTriangleExclamation} /> Something went
              wrong
            </p>
          )}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </BackdropLayout>
  );
}
