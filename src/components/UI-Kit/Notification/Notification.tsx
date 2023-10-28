import { useEffect, useState } from "react";
import s from "./Notification.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { setRemoveNotification } from "store/slices/messageSlice";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "config";
import useOpenUserProfile from "components/Helpers/openUserProfile";
import { changeUser } from "store/slices/chatSlice";
import { useNavigate } from "react-router-dom";
import {
  selectSideBarIndex,
  selectSideBarItem,
} from "store/slices/sideBarSlice";
import { chatApi } from "store/API/chatApi";

export interface iNotification {
  name: string;
  id: string;
  avatar: string;
  _id: string;
  variant: string;
  message: string;
}

const Notification = ({ data }: { data: iNotification }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState(false);
  const currentUser = useAppSelector((state) => state.user);
  const notifications = useAppSelector(
    (state) => state.messages.showNotifications
  );
  const openUserProfile = useOpenUserProfile();

  useEffect(() => {
    const showTimer = setTimeout(showNotification, 100);
    const localTimer = setTimeout(hideNotificationLocal, 7000);
    const globalTimer = setTimeout(hideNotificationGlobal, 7500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(localTimer);
      clearTimeout(globalTimer);
    };
  }, []);

  const showNotification = () => {
    setIsShow(true);
  };

  const hideNotificationLocal = () => {
    setIsShow(false);
  };

  const hideNotificationGlobal = () => {
    !!notifications.length && dispatch(setRemoveNotification());
  };

  const openProfile = () => {
    openUserProfile({
      name: data.name,
      avatar: data.avatar,
      id: data.id,
    });
  };

  const openChat = () => {
    dispatch(
      changeUser({
        avatar: data.avatar ?? "",
        name: data.name,
        id: data.id ?? "",
        chatId: currentUser.id + data.id,
      })
    );
    dispatch(selectSideBarItem("chats"));
    dispatch(selectSideBarIndex(2));
    navigate("/chats");
  };

  useEffect(() => {
    if (data.message)
      dispatch(chatApi.util.invalidateTags(["PreviewChats", "Messages"]));
  }, [data]);

  if (!data.name) return <></>;

  return (
    <div className={clsx(s.notification, isShow && s.show)}>
      <div className={s.image} onClick={openProfile}>
        {data.avatar ? (
          <img src={API_URL + data.avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <div className={s.box}>
        {data.message && <span>New message</span>}
        <h3 onClick={openProfile}>{data.name}</h3>
        {data.variant === "connect" && <span>online now</span>}
        {data.message && (
          <span onClick={openChat}>
            {data.message?.includes("<Image/> ") ? (
              <>
                <FontAwesomeIcon icon={faImage} /> {data.message?.slice(9)}
              </>
            ) : (
              data.message
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Notification;
