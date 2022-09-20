import React from "react";
import s from "./Switch.module.scss";

function Switch({ handleThemeClick }: any) {
  const [check, setCheck] = React.useState<boolean>(false);

  const handleCheck = () => {
    setCheck(!check);
    handleThemeClick(check);
  };

  return (
    <label className={s.switch}>
      <input checked={check} type="checkbox" onChange={handleCheck} />
      <span className={s.slider + " " + s.round}></span>
    </label>
  );
}

export default Switch;
