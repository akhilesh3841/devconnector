import { io } from "socket.io-client";
import { Base_url } from "./helper";

export const createSocketConnection = () => {
  return io(Base_url, {
    path: "/api/socket.io",
    transports: ["websocket"],
    withCredentials: true,
  });
};
