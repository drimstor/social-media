import React from "react";
import s from "./SideBar.module.scss";
import SideBarElement from "./SideBarElement";
import ToolTip from "../Helpers/ToolTip";
import useTheme from "hooks/useTheme";
import Switch from "../Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "store/slices/userSlice";
import { selectSideBarItem, toggleSideBar } from "store/slices/sideBarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faComments,
  faEarth,
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const SideBarList = [
  {
    icon: <FontAwesomeIcon icon={faUserCircle} />,
    title: "Profile",
  },
  {
    icon: <FontAwesomeIcon icon={faBell} />,
    title: "Notifications",
  },
  {
    icon: <FontAwesomeIcon icon={faComments} />,
    title: "Chats",
  },
  {
    icon: <FontAwesomeIcon icon={faCog} />,
    title: "Settings",
  },
];

export default function SideBar() {
  // Табы
  const selectItem = useSelector((state: any) => state.sidebar.selectItem);

  const clickOnItem = (title: string) => {
    dispatch(selectSideBarItem(title));
    setTimeout(() => navigate(`/${title}`), 450);
  };

  // Тема
  const { theme } = useTheme();

  // Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideBarState = useSelector((state: any) => state.sidebar.sideBarState);

  const logOutClick = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div
      className={s.sidebar}
      style={{ width: sideBarState ? "260px" : "70px" }}
    >
      <div className={s.toggler} onClick={() => dispatch(toggleSideBar())}>
        <ToolTip title={sideBarState ? "Hide" : "Show"}>
          <span
            style={{
              transform: sideBarState ? "rotate(180deg)" : "rotate(0deg)",
            }}
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
            onClick={() => clickOnItem(item.title)}
            selectItem={selectItem}
            item={item}
            showBar={sideBarState}
          />
        ))}
        <div className={s.indicator} />
        <div className={s.desktopIndicator} />
      </div>

      <div className={s.sidebarSwitch}>
        <ToolTip
          title={theme === "dark" ? "Light mode" : "Dark mode"}
          state={sideBarState}
        >
          <Switch />
        </ToolTip>
      </div>

      <div className={s.sidebarTooltip}>
        <ToolTip title={"Log Out"} state={sideBarState}>
          <div className={s.buttonWrapper}>
            <button
              className={sideBarState ? s.button : s.button + " " + s.hide}
              onClick={logOutClick}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Log Out</span>
            </button>
          </div>
        </ToolTip>
      </div>
    </div>
  );
}
