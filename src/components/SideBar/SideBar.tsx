import React from "react";
import s from "./SideBar.module.scss";
import SideBarElement from "./SideBarElement";
import ToolTip from "../Helpers/ToolTip";
import useTheme from "../../hooks/useTheme";
import Switch from "../Switch/Switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faComments,
  faEarth,
  faQuestionCircle,
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const SideBarList = [
  {
    icon: <FontAwesomeIcon icon={faUserCircle} />,
    title: "Profile",
  },
  {
    icon: <FontAwesomeIcon icon={faComments} />,
    title: "Chats",
  },
  {
    icon: <FontAwesomeIcon icon={faCog} />,
    title: "Settings",
  },
  {
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    title: "Help",
  },
];

interface sideBarProps {
  showBar: boolean;
  setShowBar: (showBar: boolean) => void;
}

export default function SideBar({ showBar, setShowBar }: sideBarProps) {
  // Табы
  const [selectElement, setSelectElement] = React.useState<string>("Chats");

  const handleClickOnElement = (index: string) => {
    setSelectElement(index);
  };

  // Тема
  const { theme, handleChangeTheme } = useTheme();

  return (
    <div className={s.sidebar} style={{ width: showBar ? "250px" : "70px" }}>
      <div className={s.toggler} onClick={() => setShowBar(!showBar)}>
        <ToolTip title={showBar ? "Hide" : "Show"}>
          <span
            style={{ transform: showBar ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </ToolTip>
      </div>

      <div className={s.title}>
        <FontAwesomeIcon icon={faEarth} /> <h1>Chat</h1>
        <span>ik</span>
      </div>

      <div className={s.sidebarWrapper}>
        {SideBarList.map((item, index) => (
          <SideBarElement
            key={index}
            onClick={() => handleClickOnElement(item.title)}
            selectElement={selectElement}
            item={item}
            showBar={showBar}
          />
        ))}
        <div className={s.indicator} />
        <div className={s.desktopIndicator} />
      </div>

      <div className={s.sidebarSwitch}>
        <ToolTip
          title={theme === "dark" ? "Light mode" : "Dark mode"}
          state={showBar}
        >
          <Switch themeValue={theme} handleChangeTheme={handleChangeTheme} />
        </ToolTip>
      </div>

      <div className={s.sidebarTooltip}>
        <ToolTip title={"Log Out"} state={showBar}>
          <div className={s.buttonWrapper}>
            <button className={showBar ? s.button : s.button + " " + s.hide}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Log Out</span>
            </button>
          </div>
        </ToolTip>
      </div>
    </div>
  );
}
