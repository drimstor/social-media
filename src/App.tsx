import React from "react";
import useTheme from "./hooks/useTheme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/global.scss";

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Register />
      {/* <Login /> */}
      <Home />
    </>
  );
}
