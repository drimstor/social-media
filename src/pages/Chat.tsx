import React from "react";
import s from "components/SideBar/SideBar.module.scss";
import ChatSideBar from "components/Chat/ChatSideBar";
import ChatArea from "components/Chat/ChatArea";

export default function Chat() {
  return (
    <div className={s.pageWrapper + " " + s.chat}>
      {/* <ChatSideBar />
      <ChatArea /> */}
    </div>
  );
}
