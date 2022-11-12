import React from "react";
import useHover from "hooks/useHover";
import s from "../SideBar/SideBar.module.scss";
import useMediaQuery from "hooks/useMediaQuery";
import clsx from "clsx";

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
  const isHovering: boolean = useHover(tooltipTarget);
  // Только десктоп
  const matches: boolean = useMediaQuery("(max-width: 425px)");
  return (
    <div ref={tooltipTarget} style={{ position: "relative" }}>
      <div
        className={clsx(
          s.tooltip,
          reverse && s.tooltipReverse,
          !matches && !state && isHovering && s.tooltipShow
        )}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
