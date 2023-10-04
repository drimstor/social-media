import React from "react";
import s from "../SideBar/SideBar.module.scss";
import useMediaQuery from "hooks/useMediaQuery";
import ToolTip from "../Helpers/ToolTip";

interface SideBarElementProps {
  item: Obj;
  onClick: (item: string) => void;
  selectItem: string;
  showBar?: boolean;
}

type Obj = {
  icon: React.ReactNode;
  title: string;
};

export default function SideBarElement({
  item,
  onClick,
  selectItem,
  showBar,
}: SideBarElementProps) {
  const matches = useMediaQuery("(max-width: 769px)");

  return (
    <div
      className={
        selectItem === item.title
          ? (matches ? s.select : s.active) + " " + s.sidebarElement
          : s.sidebarElement
      }
      onClick={() => onClick(item.title)}
    >
      <ToolTip title={item.title} state={showBar}>
        <div className={s.elementWrapper}>
          {item.icon} <h2>{item.title}</h2>
        </div>
      </ToolTip>
    </div>
  );
}
