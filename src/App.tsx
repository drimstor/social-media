import "styles/global.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";
import { useContext, useEffect } from "react";
import { auth } from "store/slices/userSlice";
import { useWebSocket } from "hooks/useWebSocket";
import { CachedAvatarContext } from "contexts/CacheAvatarContextProvider";
import { API_URL } from "config";

export default function App() {
  const user = useAppSelector((state) => state.user);
  const { updateAvatar } = useContext(CachedAvatarContext);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const socket = useWebSocket();

  useEffect(() => {
    if (socket && user.token) {
      socket.emit("user-connected", {
        name: user.name,
        id: user.id,
        avatar: user.avatar,
        variant: "connect",
      });
    }
  }, [socket]);

  useEffect(() => {
    if (user.token) {
      dispatch(auth(user.token));
    }

    if (user.avatar) {
      updateAvatar(API_URL + user.avatar);
    }
  }, [user.token]);

  return (
    <Routes location={location}>
      {user.id ? (
        <>
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chats" element={<Chat socket={socket} />} />
          <Route path="/profile" element={<Profile />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}
