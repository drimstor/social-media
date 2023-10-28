import { useAppDispatch } from "hooks/redux";
import { useNavigate } from "react-router-dom";
import {
  selectSideBarIndex,
  selectSideBarItem,
} from "store/slices/sideBarSlice";
import { viewAnotherUserProfile } from "store/slices/userSlice";

const useOpenUserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openUserProfile = ({ name, avatar, id }: { [key: string]: string }) => {
    dispatch(viewAnotherUserProfile({ name, avatar, id }));
    dispatch(selectSideBarItem("profile"));
    dispatch(selectSideBarIndex(1));
    navigate("/profile");
  };

  return openUserProfile;
};

export default useOpenUserProfile;
