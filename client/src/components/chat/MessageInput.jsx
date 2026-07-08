import { useState } from "react";
import { FiSend, FiSmile } from "react-icons/fi";

import { useChat } from "../../context/ChatContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const {
    selectedUser,
    sendNewMessage,
    emitTyping,
    emitStopTyping,
  } = useChat();

  let typingTimeout;

  const handleChange = (e) => {
    setMessage(e.target.value);

    if (!selectedUser) return;

    // Tell receiver user is typing
    emitTyping();

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      emitStopTyping();
    }, 1000);
  };

  const handleSend = async () => {
    console.log("🔥 handleSend called");

    if (!selectedUser) {
      console.log("❌ No user selected");
      return;
    }

    if (!message.trim()) {
      console.log("❌ Empty message");
      return;
    }

    console.log("========================");
    console.log("Receiver:", selectedUser);
    console.log("Message:", message);

    try {
      await sendNewMessage(message);

      // Stop typing immediately after sending
      emitStopTyping();

      setMessage("");

      console.log("✅ Message Sent");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-900 border-t border-slate-800 p-5 flex items-center gap-4">

      <button className="text-slate-400 hover:text-yellow-400">
        <FiSmile size={24} />
      </button>

      <input
        type="text"
        value={message}
        disabled={!selectedUser}
        placeholder={
          selectedUser
            ? "Type a message..."
            : "Select a user first..."
        }
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 bg-slate-800 rounded-2xl px-5 py-3 text-white outline-none disabled:opacity-50"
      />

      <button
        onClick={handleSend}
        disabled={!selectedUser}
        className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl disabled:bg-slate-700"
      >
        <FiSend
          size={22}
          className="text-white"
        />
      </button>

    </div>
  );
};

export default MessageInput;