import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId) return null;

  socket = io("http://localhost:5000", {
    query: {
      userId,
    },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};