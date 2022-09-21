import React from "react";

function useTheme() {
  const [theme, setTheme] = React.useState<string>("light");

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeClick = (value: string) => {
    value ? setTheme("light") : setTheme("dark");
  };

  return { theme, setTheme, handleThemeClick };
}

export default useTheme;
