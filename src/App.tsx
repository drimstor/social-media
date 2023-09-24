import "styles/global.scss";
import s from "components/SideBar/SideBar.module.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { animated } from "react-spring";
import { useAppSelector } from "hooks/redux";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Profile from "pages/Profile";
import Transitions from "components/Helpers/Transitions";

export default function App() {
  const isAuth = useAppSelector((state) => state.user.id);

  return isAuth ? (
    Transitions()((props, item) => (
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
