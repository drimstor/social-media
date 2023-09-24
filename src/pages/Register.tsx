import React, { useEffect } from "react";
import s from "styles/authentication.module.scss";
import BackdropLayout from "components/Layouts/BackdropLayout";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { registration } from "store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux";
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
import useValidation from "hooks/useValidatiton/useValidation";
import Input from "components/UI-Kit/Input/Input";
import FileInput from "components/UI-Kit/Input/FileInput";

const formInputs = [
  {
    placeholder: "Name",
    type: "text",
    icon: faUser,
  },
  {
    placeholder: "Email",
    type: "email",
    icon: faEnvelope,
  },
  {
    placeholder: "Password",
    type: "password",
    icon: faLock,
    validation: {
      minLength: 4,
    },
  },
  {
    placeholder: "Confirm password",
    type: "password",
    name: "confirmPassword",
    icon: faLockOpen,
    validation: {
      minLength: 4,
    },
  },
  {
    placeholder: "avatar",
    type: "file",
    icon: faLockOpen,
  },
];

export default function Register() {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<number | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    runCheck();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
      file: { files: any };
    };

    const name = target.name.value.toLowerCase();
    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;

    switch (false) {
      case !!name:
        setErrorMessage("Please enter name");
        break;

      case !!email:
        setErrorMessage("Please enter email");
        break;

      case !!password:
        setErrorMessage("Please enter password");
        break;

      case !!confirmPassword:
        setErrorMessage("Please enter a confirm to password");
        break;

      case password === confirmPassword:
        setErrorMessage("Passwords mismatch");
        break;
    }
  };

  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation();

  useEffect(() => {
    async function signUp() {
      await dispatch(registration(formFields));
      if (!!formFields.file) {
        // await dispatch(uploadAvatar(formFields.file));
      }
    }

    if (isNoError && formFields.password === formFields.confirmPassword) {
      signUp();
    }
  }, [isNoError]);

  return (
    <BackdropLayout>
      <div className={s.formWrapper}>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          {formInputs.map((input, index) => (
            <>
              {input.type === "file" ? (
                <FileInput
                  isCheckError={isCheckError}
                  checkValidate={checkValidate}
                  key={input.type}
                />
              ) : (
                <Input
                  key={index}
                  label={input.placeholder}
                  type={input.type}
                  name={input.name ?? input.type}
                  icon={input.icon}
                  isCheckError={isCheckError}
                  checkValidate={checkValidate}
                  validation={input.validation}
                />
              )}
            </>
          ))}

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
