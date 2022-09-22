import React from "react";

const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";

export default function useTheme() {
  const [theme, setTheme] = React.useState<string>(
    localStorage.getItem("app-theme") || defaultTheme
  );

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const handleChangeTheme = (value: boolean) => {
    value ? setTheme("light") : setTheme("dark");
  };

  return { theme, setTheme, handleChangeTheme };
}
