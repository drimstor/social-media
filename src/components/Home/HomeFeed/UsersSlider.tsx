import { useEffect } from "react";
import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomeUserBarItem from "../HomeUserBarItem";
import useMediaQuery from "hooks/useMediaQuery";
import { useLazySearchUserQuery } from "store/API/chatApi";

function HomeUsersSlider() {
  const matches = useMediaQuery("(max-width:425px)");
  const [getSearchUsers, searchResults] = useLazySearchUserQuery();

  useEffect(() => {
    getSearchUsers("getAllUsers");
  }, []);

  let breakpointsInit = 1700;
  let breakpointsArray = [];

  for (let i = 9; i >= 4; i--) {
    const obj = {
      breakpoint: breakpointsInit,
      settings: {
        slidesToShow: i,
      },
    };

    breakpointsArray.push(obj);
    breakpointsInit -= 100;
  }

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: matches ? 3 : 10,
    slidesToScroll: 1,
    easing: "ease-in-out",
    touchMove: false,
    adaptiveHeight: true,
    responsive: matches ? [] : breakpointsArray,
  };

  return (
    <div className={s.userSliderContainer}>
      {searchResults.data && (
        <Slider className={s.usersBarSlider} {...settings}>
          {searchResults.data?.length &&
            searchResults.data.map((user, index) => (
              <HomeUserBarItem user={user} active={!!(index % 3)} key={index} />
            ))}
        </Slider>
      )}
    </div>
  );
}

export default HomeUsersSlider;
