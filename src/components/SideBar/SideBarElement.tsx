import React from "react";
import useHover from "../../hooks/useHover";
import s from "../SideBar/SideBar.module.scss";

interface SideBarElementProps {
  item: Obj;
  onClick: (item: string) => void;
  selectElement: string;
}

type Obj = {
  icon: React.ReactNode;
  title: string;
};

export default function SideBarElement({
  item,
  onClick,
  selectElement,
}: SideBarElementProps) {
  const barElement = React.useRef<HTMLDivElement>(null);

  const hoverOnElement = useHover(barElement);

  return (
    <div
      ref={barElement}
      className={
        selectElement === item.title || hoverOnElement
          ? s.active + " " + s.sidebarElement
          : s.sidebarElement
      }
      onClick={() => onClick(item.title)}
    >
      <div className={s.elementWrapper}>
        {item.icon} <h2>{item.title}</h2>
      </div>
    </div>
  );
}
