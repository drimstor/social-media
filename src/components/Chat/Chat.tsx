import React from "react";
import s from "./Chat.module.scss";
import ChatArea from "./ChatArea";
import ChatSideBar from "./ChatSideBar";
import iUsers from "../../types/iUsers";
import avatar from "../../img/ZC5B45PbR1I.jpg";
import avatar2 from "../../img/RyN8L_hN83A.png";

const users: iUsers[] = [
  {
    avatar: avatar,
    name: "Lorencio",
    message: "Dolorum voluptates voluptatem?",
  },
  {
    avatar: avatar2,
    name: "Bill Gates",
    message: "Hi!",
  },
  {
    name: "User Name",
    message: "Text message",
  },
  {
    name: "User Name",
    message: "Text message",
  },
  {
    name: "User Name",
    message: "Text message",
  },
  {
    name: "User Name",
    message: "Text message",
  },
];

export default function Chat({ showBar }: { showBar: boolean }) {
  const [selectChat, setSelectChat] = React.useState<number>(0);

  const handleClickOnChat: (index: number) => void = (index) => {
    setSelectChat(index);
  };

  return (
    <div
      className={s.chat}
      style={{ width: showBar ? "calc(100% - 345px)" : "calc(100vw - 165px)" }}
    >
      <ChatSideBar
        selectChat={selectChat}
        setSelectChat={handleClickOnChat}
        users={users}
      />
      <ChatArea user={users[selectChat]} />
    </div>
  );
}
