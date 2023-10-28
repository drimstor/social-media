import { ReactNode, createContext, useState } from "react";

const CachedAvatarContext = createContext({
  avatar: "",
  updateAvatar: (newAvatar: string) => {},
});

const CachedAvatarProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState<string>("");

  const updateAvatar = async (newAvatar: string) => {
    try {
      const response = await fetch(newAvatar);
      if (response.ok) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setAvatar(objectURL);
      } else {
        console.error("Не удалось загрузить изображение.");
      }
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    }
  };

  return (
    <CachedAvatarContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </CachedAvatarContext.Provider>
  );
};

export { CachedAvatarProvider, CachedAvatarContext };
