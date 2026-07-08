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
  getSocket,
} from "../socket/socket";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [typingUsers, setTypingUsers] = useState([]);

  const [unreadMessages, setUnreadMessages] =
    useState({});

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

      const updatedUsers = (data.users || []).map(
        (user) => ({
          ...user,
          online: onlineUsers.includes(user._id),
        })
      );

      setUsers(updatedUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================
  // Update Online Status
  // ==========================

  useEffect(() => {
    setUsers((prev) =>
      prev.map((user) => ({
        ...user,
        online: onlineUsers.includes(user._id),
      }))
    );
  }, [onlineUsers]);

  // ==========================
  // Fetch Messages
  // ==========================

  const fetchMessages = async (receiverId) => {
    try {
      setLoadingMessages(true);

      const data = await getMessages(receiverId);

      setMessages(data.data || []);

    } catch (err) {
      console.error(err);

    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {

      fetchMessages(selectedUser._id);

      setUnreadMessages((prev) => {
        const copy = { ...prev };

        delete copy[selectedUser._id];

        return copy;
      });

    } else {
      setMessages([]);
    }

  }, [selectedUser]);

  // ==========================
  // Send Message
  // ==========================

  const sendNewMessage = async (text) => {
    try {

      if (!selectedUser) return;

      const data = await sendMessage(
        selectedUser._id,
        text
      );

      setMessages((prev) => [
        ...prev,
        data.data,
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Typing
  // ==========================

  const emitTyping = () => {
    if (!selectedUser) return;

    const socket = getSocket();

    if (!socket) return;

    const me = JSON.parse(
      localStorage.getItem("user")
    );

    socket.emit("typing", {
      senderId: me.id,
      receiverId: selectedUser._id,
    });
  };

  const emitStopTyping = () => {
    if (!selectedUser) return;

    const socket = getSocket();

    if (!socket) return;

    const me = JSON.parse(
      localStorage.getItem("user")
    );

    socket.emit("stopTyping", {
      senderId: me.id,
      receiverId: selectedUser._id,
    });
  };

  // ==========================
  // Socket
  // ==========================

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    const socket = connectSocket(user.id);

    socket.on("connect", () => {
      console.log("🟢 Socket Connected");
    });

    socket.on(
      "getOnlineUsers",
      (onlineUsersList) => {

        console.log(
          "🟢 Online Users:",
          onlineUsersList
        );

        setOnlineUsers(onlineUsersList);

      }
    );

    // ==========================
    // Typing Events
    // ==========================

    socket.on("typing", (senderId) => {

      console.log(
        "⌨️ Typing:",
        senderId
      );

      setTypingUsers((prev) => {

        if (prev.includes(senderId))
          return prev;

        return [...prev, senderId];

      });

    });

    socket.on("stopTyping", (senderId) => {

      console.log(
        "✋ Stop Typing:",
        senderId
      );

      setTypingUsers((prev) =>
        prev.filter((id) => id !== senderId)
      );

    });

    // ==========================
    // New Message
    // ==========================

    socket.on(
      "newMessage",
      (newMessage) => {

        console.log(
          "📩 New Socket Message:",
          newMessage
        );

        if (
          selectedUser &&
          (newMessage.sender ===
            selectedUser._id ||
            newMessage.receiver ===
              selectedUser._id)
        ) {

          setMessages((prev) => [
            ...prev,
            newMessage,
          ]);

        } else {

          setUnreadMessages((prev) => ({
            ...prev,

            [newMessage.sender]:
              (prev[newMessage.sender] || 0) + 1,
          }));

        }

      }
    );

    return () => {

      socket.off("typing");
      socket.off("stopTyping");
      socket.off("newMessage");
      socket.off("getOnlineUsers");

      disconnectSocket();

    };

  }, [selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        users,

        onlineUsers,

        typingUsers,

        selectedUser,
        setSelectedUser,

        messages,

        unreadMessages,

        loadingUsers,
        loadingMessages,

        sendNewMessage,

        emitTyping,
        emitStopTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;