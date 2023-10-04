import "styles/global.scss";
import s from "components/SideBar/SideBar.module.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks/redux";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";

export default function App() {
  const isAuth = useAppSelector((state) => state.user.id);
  const location = useLocation();

  return isAuth ? (
    <Routes location={location}>
      <Route path="/" element={<Navigate to="/chats" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chats" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
