import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { io, getReceiverSocketId } from "../socket.js";

// =======================================
// Send Message
// =======================================

export const sendMessage = async (req, res) => {
  try {
    console.log("\n========================================");
    console.log("📤 sendMessage Controller Called");

    const senderId = req.user.id;
    const receiverId = req.params.receiverId;

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    const { text, image } = req.body;

    console.log("Request Body:", req.body);

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // ===============================
    // Find Conversation
    // ===============================

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });

      console.log("✅ New Conversation Created");
    } else {
      console.log("✅ Existing Conversation Found");
    }

    // ===============================
    // Save Message
    // ===============================

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
      image,
    });

    console.log("✅ Message Saved");
    console.log(newMessage);

    conversation.lastMessage = newMessage._id;

    await conversation.save();

    console.log("✅ Conversation Updated");

    // ===============================
    // Socket
    // ===============================

    const receiverSocketId = getReceiverSocketId(receiverId);

    console.log("--------------------------------");
    console.log("Receiver Socket ID:", receiverSocketId);

    if (receiverSocketId) {
      console.log("📨 Sending Socket Event...");

      io.to(receiverSocketId).emit(
        "newMessage",
        newMessage
      );

      console.log("✅ Socket Event Sent");
    } else {
      console.log("❌ Receiver Socket NOT Found");
    }

    console.log("========================================\n");

    return res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("❌ SEND MESSAGE ERROR");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================================
// Get Messages
// =======================================

export const getMessages = async (req, res) => {
  try {
    console.log("\n========================================");
    console.log("📥 getMessages Controller Called");

    const senderId = req.user.id;
    const receiverId = req.params.receiverId;

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    const messages = await Message.find({
      $or: [
        {
          sender: senderId,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: senderId,
        },
      ],
    }).sort({
      createdAt: 1,
    });

    console.log("Messages Found:", messages.length);
    console.log("========================================\n");

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log("❌ GET MESSAGES ERROR");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};