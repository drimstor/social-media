import React, { useEffect, useRef, useState } from "react";
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
  const [tooltipWidth, settooltipWidth] = useState<number | null>(null);
  const tooltipTarget = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isHovering: boolean = useHover(tooltipTarget);
  const matches: boolean = useMediaQuery("(max-width: 769px)");

  useEffect(() => {
    const tooltipWidth = tooltipRef.current && tooltipRef.current.clientWidth;
    if (tooltipWidth) settooltipWidth(tooltipWidth / 2);

    return () => {};
  }, []);

  return (
    <div ref={tooltipTarget} style={{ position: "relative" }}>
      <div
        style={reverse ? { left: `calc(47% - ${tooltipWidth}px)` } : {}}
        ref={tooltipRef}
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
