import React from "react";
import s from "./SideBar.module.scss";
import SideBarElement from "./SideBarElement";
import ToolTip from "../Helpers/ToolTip";
import useTheme from "hooks/useTheme";
import Switch from "../Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "store/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  selectSideBarIndex,
  selectSideBarItem,
  toggleSideBar,
} from "store/slices/sideBarSlice";
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
    title: "profile",
  },
  {
    icon: <FontAwesomeIcon icon={faBell} />,
    title: "notifications",
  },
  {
    icon: <FontAwesomeIcon icon={faComments} />,
    title: "chats",
  },
  {
    icon: <FontAwesomeIcon icon={faCog} />,
    title: "settings",
  },
];

export default function SideBar() {
  const selectItem = useSelector((state: any) => state.sidebar.selectItem);
  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const clickOnItem = (title: string, index: number) => {
    dispatch(selectSideBarItem(title));
    dispatch(selectSideBarIndex(index));
    navigate(`/${title}`);
  };

  // Логаут
  const logOutClick = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className={s.sidebar} style={{ width: isOpen ? "260px" : "70px" }}>
      <div className={s.toggler} onClick={() => dispatch(toggleSideBar())}>
        <ToolTip title={isOpen ? "Hide" : "Show"}>
          <span
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
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
            onClick={() => clickOnItem(item.title, index)}
            selectItem={selectItem}
            item={item}
            showBar={isOpen}
          />
        ))}
        <div className={s.indicator} />
        <div className={s.desktopIndicator} />
      </div>

      <div className={s.sidebarSwitch}>
        <ToolTip
          title={theme === "dark" ? "Light mode" : "Dark mode"}
          state={isOpen}
        >
          <Switch />
        </ToolTip>
      </div>

      <div className={s.sidebarTooltip}>
        <ToolTip title={"Log Out"} state={isOpen}>
          <div className={s.buttonWrapper}>
            <button
              className={isOpen ? s.button : s.button + " " + s.hide}
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
