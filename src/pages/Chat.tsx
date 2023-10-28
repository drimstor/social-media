import s from "components/SideBar/SideBar.module.scss";
import ChatSideBar from "components/Chat/ChatSideBar";
import ChatArea from "components/Chat/ChatArea";
import clsx from "clsx";

export default function Chat({ socket }: any) {
  return (
    <div className={clsx(s.pageWrapper, s.chat)}>
      <ChatSideBar />
      <ChatArea socket={socket} />
    </div>
  );
}
