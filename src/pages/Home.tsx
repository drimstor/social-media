import React from "react";
import Chat from "../components/Chat/Chat";
import SideBar from "../components/SideBar/SideBar";
import s from "../styles/Home.module.scss";

export default function Home() {
  // Раскрыть сайдбар
  const [showBar, setShowBar] = React.useState<boolean>(false);

  return (
    <div className={s.body}>
      <SideBar showBar={showBar} setShowBar={setShowBar} />
      <Chat showBar={showBar} />
    </div>
  );
}
