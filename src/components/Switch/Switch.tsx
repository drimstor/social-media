import useTheme from "hooks/useTheme";
import React from "react";
import s from "./Switch.module.scss";

function Switch() {
  const { theme, handleChangeTheme } = useTheme();

  let [check, setCheck] = React.useState<boolean>(
    theme === "dark" ? true : false
  );

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(!check);
    handleChangeTheme(check);
  };

  return (
    <label className={s.switch}>
      <input checked={check} type="checkbox" onChange={handleCheck} />
      <span className={s.slider + " " + s.round}></span>
    </label>
  );
}

export default Switch;
