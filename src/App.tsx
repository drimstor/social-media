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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={user ? <Chat /> : <Login />} />
      <Route path="/profile" element={user ? <Profile /> : <Login />} />
      <Route path="/chats" element={user ? <Chat /> : <Login />} />
    </Routes>
  );
}
