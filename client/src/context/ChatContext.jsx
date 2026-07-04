import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getUsers } from "../services/userService";
import {
  getMessages,
  sendMessage,
} from "../services/messageService";

import {
  connectSocket,
  disconnectSocket,
} from "../socket/socket";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [loadingUsers, setLoadingUsers] =
    useState(false);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  // ==========================
  // Fetch Users
  // ==========================

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const data = await getUsers();

      console.log("✅ Users:", data);

      setUsers(data.users || []);
    } catch (error) {
      console.error("❌ Users Error:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================
  // Fetch Messages
  // ==========================

  const fetchMessages = async (receiverId) => {
    try {
      setLoadingMessages(true);

      console.log(
        "📥 Fetch Messages:",
        receiverId
      );

      const data = await getMessages(receiverId);

      console.log("✅ Messages:", data);

      setMessages(data.data || []);
    } catch (error) {
      console.error(
        "❌ Fetch Messages Error:",
        error
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  // ==========================
  // Send Message
  // ==========================

  const sendNewMessage = async (text) => {
    try {
      if (!selectedUser) {
        console.log("❌ No User Selected");
        return;
      }

      console.log("📤 Sending Message...");
      console.log("Receiver:", selectedUser._id);
      console.log("Text:", text);

      const data = await sendMessage(
        selectedUser._id,
        text
      );

      console.log("✅ Send Response:", data);

      setMessages((prev) => [
        ...prev,
        data.data,
      ]);
    } catch (error) {
      console.error(
        "❌ Send Message Error:",
        error
      );
    }
  };

  // ==========================
  // Socket Connection
  // ==========================

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    const socket = connectSocket(user.id);

    socket.on("connect", () => {
      console.log(
        "🟢 Socket Connected"
      );
    });

    socket.on(
      "getOnlineUsers",
      (users) => {
        console.log(
          "🟢 Online Users:",
          users
        );

        setOnlineUsers(users);
      }
    );

    socket.on("newMessage", (message) => {
      console.log(
        "📩 New Socket Message:",
        message
      );

      setMessages((prev) => [
        ...prev,
        message,
      ]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        users,
        onlineUsers,

        selectedUser,
        setSelectedUser,

        messages,

        loadingUsers,
        loadingMessages,

        fetchUsers,
        fetchMessages,

        sendNewMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;