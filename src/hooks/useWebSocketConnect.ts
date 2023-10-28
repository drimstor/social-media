import { DEV_API_URL } from "config";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const useWebSocketConnect = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(DEV_API_URL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
