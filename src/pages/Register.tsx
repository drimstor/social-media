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
  faCircleCheck,
  faCircleDown,
  faEnvelope,
  faLock,
  faLockOpen,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [image, setImage] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<number | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const displayName = e.target[0].value.toLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (confirmPassword !== password) {
      setErrorMessage("Passwords do not match");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          setErrorMessage("");
          //Create a unique image name
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setLoading(0);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
              setLoading(Math.round(progress));
            },
            (error) => {
              setErrorMessage("Something went wrong");
            },
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  console.log("File available at", downloadURL);
                  try {
                    // Update profile
                    await updateProfile(user, {
                      displayName,
                      photoURL: downloadURL,
                    });
                    //create user on firestore
                    await setDoc(doc(db, "users", user.uid), {
                      displayName,
                      photoURL: downloadURL,
                      email,
                      id: user.uid,
                    });
                    // Redux
                    dispatch(
                      setUser({
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                        id: user.uid,
                      })
                    );
                    // Redirect
                    navigate("/");
                  } catch (error) {
                    setErrorMessage("Something went wrong");
                  }
                }
              );
            }
          );
        })
        .catch((error) => {
          const errorContent = error.message;
          setErrorMessage(errorContent.slice(10));
        });
    }
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
            <input type="text" required />
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

          <input
            type="file"
            id="file"
            onChange={(e) => e.target.value && setImage(true)}
            accept="image/*"
          />
          <label htmlFor="file">
            {image ? (
              <FontAwesomeIcon icon={faCircleCheck} />
            ) : (
              <FontAwesomeIcon icon={faCircleDown} />
            )}
            <span>{image ? "Avatar added" : "Add an avatar"}</span>
          </label>

          <button className="button" type="submit">
            Register
          </button>

          {errorMessage && (
            <p className={s.error}>
              <FontAwesomeIcon icon={faTriangleExclamation} /> {errorMessage}
            </p>
          )}

          {loading !== null && (
            <div className={s.loading}>
              <span>Loading</span>
              <div className={s.loadingBox}>
                <div
                  className={s.loadingBar}
                  style={{
                    width: `calc(${loading > 9 ? loading : 9}% - 4px)`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </BackdropLayout>
  );
}
