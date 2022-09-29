import React from "react";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import "styles/global.scss";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
