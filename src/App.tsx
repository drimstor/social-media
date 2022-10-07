import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "styles/global.scss";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";
import { useTransition, animated } from "react-spring";
import s from "components/SideBar/SideBar.module.scss";
import useMediaQuery from "hooks/useMediaQuery";

export default function App() {
  const isAuth = useSelector((state: any) => state.user.id);
  const location = useLocation();
  const sidebarIndex = useSelector((state: any) => state.sidebar.selectIndex);
  const [prevIndex, setPrevIndex] = React.useState(sidebarIndex);
  const matches: boolean = useMediaQuery("(max-width: 425px)");

  const transitions = useTransition(location, {
    enter:
      sidebarIndex !== prevIndex
        ? !matches
          ? {
              opacity: 0,
              transform:
                sidebarIndex < prevIndex
                  ? "translate(0%,-30%) scale(0.9)"
                  : "translate(0%, 30%) scale(0.9)",
              filter: "blur(10px)",
            }
          : {
              transform:
                sidebarIndex < prevIndex
                  ? "translate(-30%, 0%)  scale(0.9)"
                  : "translate(30%, 0%)  scale(0.9)",
            }
        : {},
    update: {
      opacity: 1,
      transform: "translate(0%,0%) scale(1)",
      filter: "blur(0px)",
    },
    leave:
      sidebarIndex !== prevIndex
        ? !matches
          ? {
              opacity: 0,
              transform:
                sidebarIndex > prevIndex
                  ? "translate(0%,-30%) scale(0.9)"
                  : "translate(0%, 30%) scale(0.9)",
              filter: "blur(10px)",
            }
          : {
              transform:
                sidebarIndex > prevIndex
                  ? "translate(-30%, 0%)  scale(0.9)"
                  : "translate(30%, 0%)  scale(0.9)",
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
