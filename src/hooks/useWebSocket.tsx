import { useEffect } from "react";
import { useWebSocketConnect } from "./useWebSocketConnect";
import { setShowNotification } from "store/slices/messageSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const socket = useWebSocketConnect();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (socket && user.token) {
      socket.on("connect", () => {
        console.log("Соединение установлено - ", socket.id);
      });

      socket.on("user-connected", (user) => {
        dispatch(setShowNotification(user));
      });

      socket.on("new-message", (message) => {
        if (message.recipientId === user.id) {
          dispatch(setShowNotification(message));
        }
      });

      socket.on("error", (error) => {
        console.log(`Error ${error}`);
      });
    }

    return () => {
      if (socket) socket.removeAllListeners();
    };
  }, [socket, user]);

  return socket;
};
