import { Server } from "socket.io";

let io;

// Store online users
// Format:
// {
//   userId: socketId
// }
const userSocketMap = {};

// Get socket id by user id
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// Initialize Socket.IO
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User Connected:", socket.id);

    // Get user id from frontend
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    // Send updated online users to everyone
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);

      delete userSocketMap[userId];

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export { io };