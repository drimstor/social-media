import SideBar from "components/SideBar/SideBar";
import React from "react";
import { useSelector } from "react-redux";
import s from "../SideBar/SideBar.module.scss";

interface SideBarLayoutProps {
  children: React.ReactNode;
}

function SideBarLayout({ children }: SideBarLayoutProps) {
  const sideBarState = useSelector((state: any) => state.sidebar.sideBarState);
  return (
    <div className={s.body}>
      <div
        className={s.contentBox}
        style={{
          width: sideBarState ? "calc(100vw - 355px)" : "calc(100vw - 165px)",
        }}
      >
        {children}
      </div>
      <SideBar />
    </div>
  );
}

export default SideBarLayout;
