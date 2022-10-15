import React from "react";
import s from "../SideBar/SideBar.module.scss";
import SideBar from "components/SideBar/SideBar";
import { useAppSelector } from "hooks/redux";

interface SideBarLayoutProps {
  children: React.ReactNode;
}

function SideBarLayout({ children }: SideBarLayoutProps) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const isAuth = useAppSelector((state) => state.user.id);
  return (
    <>
      {isAuth ? (
        <div className={s.body}>
          <div className={s.backgroundItem} />
          <div
            className={s.contentBox}
            style={{
              width: isOpen ? "calc(100vw - 295px)" : "calc(100vw - 135px)",
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
