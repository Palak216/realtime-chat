import { io } from "socket.io-client";

let socket = null;

// ==========================
// Connect Socket
// ==========================

export const connectSocket = (userId) => {
  if (socket?.connected) {
    return socket;
  }

  socket = io("http://localhost:5000", {
    query: {
      userId,
    },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("🟢 Socket Connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket Disconnected");
  });

  return socket;
};

// ==========================
// Get Socket
// ==========================

export const getSocket = () => socket;

// ==========================
// Disconnect Socket
// ==========================

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};