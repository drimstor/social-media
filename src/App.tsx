import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "styles/global.scss";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";
import { useTransition, animated } from "react-spring";
import s from "components/SideBar/SideBar.module.scss";

export default function App() {
  const user = useSelector((state: any) => state.user.token);
  const location = useLocation();

  const transitions = useTransition(location, {
    enter: {
      transform: "translateY(100%) scale(0.8)",
    },
    update: {
      transform: "translateY(0%) scale(1)",
    },
    leave: {
      transform: "translateY(-100%) scale(0.8)",
    },
  });

  return user ? (
    transitions((props, item) => (
      <animated.section style={props}>
        <div className={s.animateWrapper}>
          <Routes location={item}>
            <Route path="/" element={<Chat />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </animated.section>
    ))
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
