import {
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import clsx from "clsx";
import s from "./Snackbar.module.scss";
import { setRemoveSnackbar } from "store/slices/messageSlice";
import { logout } from "store/slices/userSlice";

export interface iSnackbar {
  message: string;
  variant: "success" | "fail" | "attention";
  id: number;
}

function Snackbar({ data }: { data: iSnackbar }) {
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState(false);
  const messages = useAppSelector((state) => state.messages.showSnackbar);

  useEffect(() => {
    const showTimer = setTimeout(showSnackbar, 100);
    const localTimer = setTimeout(hideSnackbarLocal, 3500);
    const globalTimer = setTimeout(hideSnackbarGlobal, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(localTimer);
      clearTimeout(globalTimer);
    };
  }, []);

  if (data.message === "Auth error") {
    dispatch(logout());
  }

  const showSnackbar = () => {
    setIsShow(true);
  };

  const hideSnackbarLocal = () => {
    setIsShow(false);
  };

  const hideSnackbarGlobal = () => {
    !!messages.length && dispatch(setRemoveSnackbar());
  };

  return (
    <div className={clsx(s.snackbar, isShow && s.show, s[data?.variant])}>
      {data?.variant === "success" && <FontAwesomeIcon icon={faCircleCheck} />}

      {data?.variant === "fail" && (
        <FontAwesomeIcon icon={faCircleExclamation} />
      )}

      {data?.variant === "attention" && (
        <FontAwesomeIcon icon={faTriangleExclamation} />
      )}

      <p>{data.message ?? ""}</p>
    </div>
  );
}

export default Snackbar;
