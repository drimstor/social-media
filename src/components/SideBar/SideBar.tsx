import React from "react";
import s from "./SideBar.module.scss";
import SideBarElement from "./SideBarElement";
import ToolTip from "../Helpers/ToolTip";
import useTheme from "hooks/useTheme";
import Switch from "../Switch/Switch";
import { useNavigate } from "react-router-dom";
import { logout, resetViewAnotherUserProfile } from "store/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  selectSideBarIndex,
  selectSideBarItem,
  toggleSideBar,
} from "store/slices/sideBarSlice";
import {
  faAngleRight,
  faBell,
  faCog,
  faComments,
  faEarth,
  faHouse,
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import useMediaQuery from "hooks/useMediaQuery";

const SideBarElements = [
  {
    icon: <FontAwesomeIcon icon={faHouse} />,
    title: "home",
  },
  {
    icon: <FontAwesomeIcon icon={faUserCircle} />,
    title: "profile",
  },
  {
    icon: <FontAwesomeIcon icon={faComments} />,
    title: "chats",
  },
  {
    icon: <FontAwesomeIcon icon={faBell} />,
    title: "notices",
  },
  {
    icon: <FontAwesomeIcon icon={faCog} />,
    title: "settings",
  },
];

export default function SideBar() {
  const selectItem = useAppSelector((state) => state.sidebar.selectItem);
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const isMobile = useMediaQuery("(max-width:769px)");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const clickOnItem = (title: string, index: number) => {
    if (title === "profile") dispatch(resetViewAnotherUserProfile());

    dispatch(selectSideBarItem(title));
    dispatch(selectSideBarIndex(index));
    navigate(`/${title}`);
  };

  // Логаут
  const logOutClick = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={s.sidebar} style={{ width: isOpen ? "230px" : "70px" }}>
      <div className={s.toggler} onClick={() => dispatch(toggleSideBar())}>
        <ToolTip title={isOpen ? "Hide" : "Show"}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </ToolTip>
      </div>

      <div className={s.title}>
        <FontAwesomeIcon icon={faEarth} /> <h1>Social</h1>
      </div>

      <div className={s.sidebarWrapper}>
        {SideBarElements.map((item, index) => (
          <SideBarElement
            key={index + item.title}
            onClick={() => clickOnItem(item.title, index)}
            selectItem={selectItem}
            item={item}
            showBar={isOpen}
          />
        ))}
        <div className={s.indicator} />
        <div className={s.desktopIndicator} />
      </div>

      {((isMobile && selectItem === "settings") || !isMobile) && (
        <div className={s.sidebarSwitch}>
          <ToolTip
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            state={isOpen}
          >
            <Switch />
          </ToolTip>
        </div>
      )}

      {((isMobile && selectItem === "settings") || !isMobile) && (
        <div className={s.sidebarTooltip}>
          <ToolTip title={"Log Out"} state={isOpen}>
            <div className={s.buttonWrapper}>
              <button
                className={clsx(s.button, isOpen && s.hide)}
                onClick={logOutClick}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Log Out</span>
              </button>
            </div>
          </ToolTip>
        </div>
      )}
    </div>
  );
}
