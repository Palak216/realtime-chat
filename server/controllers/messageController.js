import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { io, getReceiverSocketId } from "../socket.js";

// =======================================
// Send Message
// =======================================

export const sendMessage = async (req, res) => {
  try {
    console.log("==================================");
    console.log("✅ sendMessage controller called");

    const senderId = req.user.id;
    const receiverId = req.params.receiverId;

    console.log("Sender:", senderId);
    console.log("Receiver:", receiverId);

    const { text, image } = req.body;

    console.log("Body:", req.body);

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });

      console.log("✅ Conversation Created");
    }

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

    const receiverSocketId =
      getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "newMessage",
        newMessage
      );

      console.log("📨 Socket Message Sent");
    }

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("❌ SEND MESSAGE ERROR");
    console.log(error);

    res.status(500).json({
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
    console.log("==================================");
    console.log("✅ getMessages controller called");

    const senderId = req.user.id;
    const receiverId = req.params.receiverId;

    console.log("Sender:", senderId);
    console.log("Receiver:", receiverId);

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

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log("❌ GET MESSAGE ERROR");
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};