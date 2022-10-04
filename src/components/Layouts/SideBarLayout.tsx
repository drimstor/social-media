import SideBar from "components/SideBar/SideBar";
import React from "react";
import { useSelector } from "react-redux";
import s from "../SideBar/SideBar.module.scss";

interface SideBarLayoutProps {
  children: React.ReactNode;
}

function SideBarLayout({ children }: SideBarLayoutProps) {
  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  return (
    <div className={s.body}>
      <div className={s.backgroundItem} />
      <section
        className={s.contentBox}
        id='contentBox'
        style={{
          width: isOpen ? "calc(100vw - 355px)" : "calc(100vw - 165px)",
        }}
      >
        {children}
      </section>
      <SideBar />
    </div>
  );
}

export default SideBarLayout;
