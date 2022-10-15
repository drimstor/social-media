import { useAppSelector } from "hooks/redux";
import useMediaQuery from "hooks/useMediaQuery";
import React from "react";
import { useLocation } from "react-router-dom";
import { useTransition } from "react-spring";

export default function Transitions() {
  const location = useLocation();
  const sidebarIndex = useAppSelector((state) => state.sidebar.selectIndex);
  const [prevIndex, setPrevIndex] = React.useState(sidebarIndex);
  const matches: boolean = useMediaQuery("(max-width: 425px)");

  const transitions = useTransition(location, {
    enter:
      sidebarIndex !== prevIndex
        ? !matches
          ? {
              opacity: 0,
              filter: "blur(2px)",
            }
          : {
              transform:
                sidebarIndex < prevIndex
                  ? "translate(-30%, 0%) "
                  : "translate(30%, 0%) ",
            }
        : {},
    update: {
      opacity: 1,
      transform: "translate(0,0)",
      filter: "blur(0px)",
      backdropFilter: "blur(5px)",
    },
    leave:
      sidebarIndex !== prevIndex
        ? !matches
          ? {
              opacity: 0,
              filter: "blur(10px)",
            }
          : {
              transform:
                sidebarIndex > prevIndex
                  ? "translate(-30%, 0%) "
                  : "translate(30%, 0%) ",
            }
        : {},
    config: {
      duration: 300,
    },
    onRest: () => {
      setPrevIndex(sidebarIndex);
    },
  });

  return transitions;
}
