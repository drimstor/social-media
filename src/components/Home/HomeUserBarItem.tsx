import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import clsx from "clsx";
import { API_URL } from "config";
import { iUser } from "types/iUser";
import useOpenUserProfile from "components/Helpers/openUserProfile";

interface HomeUserBarItemProps {
  user: iUser;
  active?: boolean;
}

function HomeUserBarItem({ user, active }: HomeUserBarItemProps) {
  const openUserProfile = useOpenUserProfile();

  const openProfile = () => {
    openUserProfile({
      name: user.name,
      avatar: user.avatar ?? "",
      id: user._id ?? "",
    });
  };

  return (
    <div className={s.userBarItemBox}>
      <div
        className={clsx(
          s.userBarItem,
          active && s.active,
          !user.avatar && s.circle
        )}
        onClick={openProfile}
      >
        {user.avatar ? (
          <img src={API_URL + user.avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} />
        )}
      </div>
      <h2>{user.name}</h2>
    </div>
  );
}

export default HomeUserBarItem;
