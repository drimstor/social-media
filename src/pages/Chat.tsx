import React from "react";
import ChatSideBar from "components/Chat/ChatSideBar";
import iUsers from "types/iUsers";
import avatar from "img/ZC5B45PbR1I.jpg";
import avatar2 from "img/RyN8L_hN83A.png";
import { useSelector } from "react-redux";
import SideBarLayout from "components/Layouts/SideBarLayout";
import ChatArea from "components/Chat/ChatArea";

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

  const handleClickOnChat: (index: number) => void = (index) => {
    setSelectChat(index);
  };

  const stateUser = useSelector((state: any) => state.user);

  return (
    <SideBarLayout>
      <ChatSideBar
        selectChat={selectChat}
        setSelectChat={handleClickOnChat}
        users={users}
      />
      <ChatArea user={users[selectChat]} />
    </SideBarLayout>
  );
}
