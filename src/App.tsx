import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "styles/global.scss";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";

export default function App() {
  const user = useSelector((state: any) => state.user.token);

  return (
    <Routes>
      <Route path="/" element={user ? <Chat /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chats" element={<Chat />} />
    </Routes>
  );
}
