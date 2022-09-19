import React from "react";
import useHover from "../../hooks/useHover";
import s from "../SideBar/SideBar.module.scss";

interface ToolTipProps {
  children: React.ReactNode;
  title: string;
  state?: boolean;
  reverse?: boolean;
}

export default function ToolTip({
  children,
  title,
  state,
  reverse,
}: ToolTipProps) {
  // Тултипы
  const tooltipTarget = React.useRef<HTMLDivElement>(null);
  // Показать тултип
  const isHovering = useHover(tooltipTarget);
  return (
    <div ref={tooltipTarget} style={{ position: "relative" }}>
      <div
        className={
          !state && isHovering
            ? reverse
              ? s.tooltip + " " + s.tooltipShow + " " + s.tooltipReverse
              : s.tooltip + " " + s.tooltipShow
            : reverse
            ? s.tooltip + " " + s.tooltipReverse
            : s.tooltip
        }
      >
        {title}
      </div>
      {children}
    </div>
  );
}
