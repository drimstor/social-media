import b from "components/SideBar/SideBar.module.scss";
import HomeActivity from "components/Home/HomeActivity";
import HomeFeed from "components/Home/HomeFeed/Feed";

export default function Home() {
  return (
    <div className={b.pageWrapper + " " + b.home}>
      <HomeFeed />
      <HomeActivity />
    </div>
  );
}
