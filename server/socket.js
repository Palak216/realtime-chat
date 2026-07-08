import { Server } from "socket.io";

let io;

// =====================================
// userId -> socketId
// =====================================

const userSocketMap = {};

// =====================================
// Get Receiver Socket ID
// =====================================

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// =====================================
// Initialize Socket.IO
// =====================================

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("====================================");
    console.log("🟢 Socket Connected");
    console.log("Socket ID:", socket.id);

    const userId = socket.handshake.query.userId;

    console.log("User ID:", userId);

    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    console.log("Current Online Users:");
    console.log(userSocketMap);

    // Broadcast Online Users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // =====================================
    // Typing
    // =====================================

    socket.on("typing", ({ senderId, receiverId }) => {
      console.log(
        `${senderId} is typing to ${receiverId}`
      );

      const receiverSocketId =
        getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "typing",
          senderId
        );
      }
    });

    // =====================================
    // Stop Typing
    // =====================================

    socket.on(
      "stopTyping",
      ({ senderId, receiverId }) => {
        console.log(
          `${senderId} stopped typing`
        );

        const receiverSocketId =
          getReceiverSocketId(receiverId);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "stopTyping",
            senderId
          );
        }
      }
    );

    // =====================================
    // Disconnect
    // =====================================

    socket.on("disconnect", () => {
      console.log("====================================");
      console.log("🔴 Socket Disconnected");
      console.log("Socket ID:", socket.id);
      console.log("User ID:", userId);

      if (userId) {
        delete userSocketMap[userId];
      }

      console.log("Remaining Online Users:");
      console.log(userSocketMap);

      io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
      );
    });
  });
};

// =====================================
// Exports
// =====================================

export { io, userSocketMap };