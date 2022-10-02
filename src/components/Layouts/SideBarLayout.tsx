import SideBar from "components/SideBar/SideBar";
import React from "react";
import { useSelector } from "react-redux";
import s from "../SideBar/SideBar.module.scss";

function SideBarLayout({ children }: { children: React.ReactNode }) {
  const sideBarState = useSelector((state: any) => state.sidebar.sideBarState);
  return (
    <div className={s.body}>
      <div
        className={s.contentBox}
        style={{
          width: sideBarState ? "calc(100vw - 345px)" : "calc(100vw - 165px)",
        }}
      >
        {children}
      </div>
      <SideBar />
    </div>
  );
}

export default SideBarLayout;
