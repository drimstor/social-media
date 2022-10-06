import SideBar from "components/SideBar/SideBar";
import React from "react";
import { useSelector } from "react-redux";
import s from "../SideBar/SideBar.module.scss";

interface SideBarLayoutProps {
  children: React.ReactNode;
}

function SideBarLayout({ children }: SideBarLayoutProps) {
  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  const isAuth = useSelector((state: any) => state.user.id);
  return (
    <>
      {isAuth ? (
        <div className={s.body}>
          <div className={s.backgroundItem} />
          <div
            className={s.contentBox}
            style={{
              width: isOpen ? "calc(100vw - 355px)" : "calc(100vw - 165px)",
            }}
          >
            {children}
          </div>
          <SideBar />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default SideBarLayout;
