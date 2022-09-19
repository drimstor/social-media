import React from "react";
import useHover from "../../hooks/useHover";
import s from "../SideBar/SideBar.module.scss";
import useMediaQuery from "../../hooks/useMediaQuery";

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

  const matches = useMediaQuery("(max-width: 425px)");

  return (
    <div
      ref={barElement}
      className={
        selectElement === item.title || hoverOnElement
          ? (matches ? s.select : s.active) + " " + s.sidebarElement
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
