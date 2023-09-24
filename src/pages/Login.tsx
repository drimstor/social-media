import React, { useEffect } from "react";
import s from "styles/authentication.module.scss";
import BackdropLayout from "components/Layouts/BackdropLayout";
import { getAuth } from "firebase/auth";
import { login } from "store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  selectSideBarIndex,
  selectSideBarItem,
} from "store/slices/sideBarSlice";
import Input from "components/UI-Kit/Input/Input";
import useValidation from "hooks/useValidatiton/useValidation";

const formInputs = [
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
];

export default function Login() {
  const [error, setError] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  // const handleSubmit = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();

  //   const target = e.target as typeof e.target & {
  //     email: { value: string };
  //     password: { value: string };
  //   };

  //   const email = target.email.value;
  //   const password = target.password.value;

  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then(({ user }) => {
  //       dispatch(selectSideBarItem("chats"));
  //       dispatch(selectSideBarIndex(2));
  //       if (user.email && user.displayName !== null) {
  //         dispatch(
  //           setUser({
  //             displayName: user.displayName,
  //             photoURL: user.photoURL,
  //             email: user.email,
  //             id: user.uid,
  //           })
  //         );
  //       }
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       setError(true);
  //     });
  // };

  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    runCheck();
  };

  useEffect(() => {
    if (isNoError) {
      dispatch(
        login({
          email: formFields.email,
          password: formFields.password,
        })
      );

      dispatch(selectSideBarItem("chats"));
      dispatch(selectSideBarIndex(2));
    }
  }, [isNoError]);

  return (
    <BackdropLayout>
      <div className={s.formWrapper}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          {formInputs.map((input, index) => (
            <Input
              key={index}
              label={input.placeholder}
              type={input.type}
              name={input.type}
              icon={input.icon}
              isCheckError={isCheckError}
              checkValidate={checkValidate}
              validation={input.validation}
            />
          ))}
          <button className="button" type="submit">
            Sing in
          </button>
          {error && (
            <p className={s.error}>
              <FontAwesomeIcon icon={faTriangleExclamation} /> Wrong Email or
              Password
            </p>
          )}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </BackdropLayout>
  );
}
