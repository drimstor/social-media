import React from "react";
import s from "./Switch.module.scss";

type iSwitch = {
  handleChangeTheme: (value: boolean) => void;
  themeValue?: string;
};

function Switch({ handleChangeTheme, themeValue }: iSwitch) {
  let [check, setCheck] = React.useState<boolean>(
    themeValue === "dark" ? true : false
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
