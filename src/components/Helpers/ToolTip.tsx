import React from "react";
import useHover from "../../hooks/useHover";
import s from "../SideBar/SideBar.module.scss";

interface ToolTipProps {
  children: React.ReactNode;
  title: string;
  state?: boolean;
}

export default function ToolTip({ children, title, state }: ToolTipProps) {
  // Тултипы
  const tooltipTarget = React.useRef<HTMLDivElement>(null);
  // Показать тултип
  const isHovering = useHover(tooltipTarget);
  return (
    <>
      <div
        className={
          !state && isHovering ? s.tooltip + " " + s.tooltipShow : s.tooltip
        }
      >
        {title}
      </div>
      <div ref={tooltipTarget}>{children}</div>
    </>
  );
}
