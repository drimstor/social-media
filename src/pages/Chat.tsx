import React from "react";
import ChatSideBar from "components/Chat/ChatSideBar";
import iUsers from "types/iUsers";
import avatar from "img/ZC5B45PbR1I.jpg";
import avatar2 from "img/RyN8L_hN83A.png";
import ChatArea from "components/Chat/ChatArea";
import s from "components/SideBar/SideBar.module.scss";

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

export default function Chat() {
  const [selectChat, setSelectChat] = React.useState<number>(0);

  const clickOnChat: (index: number) => void = (index) => {
    setSelectChat(index);
  };

  return (
    <div className={s.pageWrapper + " " + s.chat}>
      <ChatSideBar
        selectChat={selectChat}
        setSelectChat={clickOnChat}
        users={users}
      />
      <ChatArea user={users[selectChat]} />
    </div>
  );
}
