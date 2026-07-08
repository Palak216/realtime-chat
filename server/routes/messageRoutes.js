import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/:receiverId", authMiddleware, getMessages);

router.post(
  "/send/:receiverId",
  authMiddleware,
  sendMessage
);

export default router;