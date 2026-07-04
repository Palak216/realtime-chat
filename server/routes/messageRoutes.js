import express from "express";
import {
  sendMessage,
  getMessages,
} from "../controllers/messageController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Send Message
router.post(
  "/send/:receiverId",
  authMiddleware,
  sendMessage
);

// Get Messages
router.get(
  "/:receiverId",
  authMiddleware,
  getMessages
);

export default router;