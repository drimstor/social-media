import React from "react";
import "styles/global.scss";
import s from "components/SideBar/SideBar.module.scss";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { useAppSelector } from "hooks/redux";
import useMediaQuery from "hooks/useMediaQuery";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";

export default function App() {
  const isAuth = useAppSelector((state) => state.user.id);
  const sidebarIndex = useAppSelector((state) => state.sidebar.selectIndex);
  const location = useLocation();
  const [prevIndex, setPrevIndex] = React.useState(sidebarIndex);
  const matches: boolean = useMediaQuery("(max-width: 425px)");

  const transitions = useTransition(location, {
    enter:
      sidebarIndex !== prevIndex
        ? !matches
          ? {
              opacity: 0,
              // transform:
              //   sidebarIndex < prevIndex
              //     ? "translate(0%,-30%)"
              //     : "translate(0%, 30%)",
              filter: "blur(7px)",
            }
          : {
              transform:
                sidebarIndex < prevIndex
                  ? "translate(-30%, 0%) "
                  : "translate(30%, 0%) ",
            }
        : {},
    update: {
      opacity: 1,
      transform: "translate(0,0)",
      filter: "blur(0px)",
      backdropFilter: "blur(5px)",
    },
    leave:
      sidebarIndex !== prevIndex
        ? !matches
          ? {
              opacity: 0,
              // transform:
              //   sidebarIndex > prevIndex
              //     ? "translate(0%,-30%)"
              //     : "translate(0%, 30%)",
              filter: "blur(7px)",
            }
          : {
              transform:
                sidebarIndex > prevIndex
                  ? "translate(-30%, 0%) "
                  : "translate(30%, 0%) ",
            }
        : {},
    config: {
      duration: 300,
    },
    onRest: () => {
      setPrevIndex(sidebarIndex);
    },
  });

  return isAuth ? (
    transitions((props, item) => (
      <animated.section style={props}>
        <div className={s.animateWrapper}>
          <Routes location={item}>
            <Route path="/" element={<Navigate to="/chats" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </animated.section>
    ))
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
