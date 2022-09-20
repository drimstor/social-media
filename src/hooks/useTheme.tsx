import React from "react";

function useTheme() {
  const [theme, setTheme] = React.useState<string>("light");

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export default useTheme;
