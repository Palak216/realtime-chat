import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { initializeSocket } from "./socket.js";

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Create Express App
const app = express();

// Create HTTP Server
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// =============================
// Middlewares
// =============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =============================
// Health Check Route
// =============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// =============================
// API Routes
// =============================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/messages", messageRoutes);

// =============================
// 404 Route
// =============================

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =============================
// Initialize Socket.IO
// =============================

initializeSocket(server);

// =============================
// Start Server
// =============================

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});