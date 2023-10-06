import "styles/global.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";
import { useEffect } from "react";
import { auth } from "store/slices/userSlice";

export default function App() {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.token) {
      dispatch(auth(user.token));
    }
  }, [user.token]);

  return (
    <Routes location={location}>
      {user.id ? (
        <>
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chats" element={<Chat />} />
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
