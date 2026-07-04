import { useState } from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import { useChat } from "../../context/ChatContext";

const MessageInput = ({ selectedUser }) => {
  const [message, setMessage] = useState("");

  const { sendNewMessage } = useChat();

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await sendNewMessage(message);

      setMessage("");
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

  return (
    <div className="bg-slate-900 border-t border-slate-800 p-5 flex items-center gap-4">

      {/* Emoji Button */}
      <button className="text-slate-400 hover:text-yellow-400 transition">
        <FiSmile size={24} />
      </button>

      {/* Input */}
      <input
        type="text"
        placeholder={
          selectedUser
            ? "Type a message..."
            : "Select a user first..."
        }
        disabled={!selectedUser}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 bg-slate-800 rounded-2xl px-5 py-3 outline-none text-white placeholder:text-slate-500 disabled:opacity-50"
      />

      {/* Send Button */}
      <button
        disabled={!selectedUser}
        onClick={handleSend}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition p-3 rounded-xl disabled:bg-slate-700 disabled:hover:scale-100"
      >
        <FiSend size={22} className="text-white" />
      </button>

    </div>
  );
};

export default MessageInput;