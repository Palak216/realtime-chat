import { useEffect, useRef } from "react";

const ChatWindow = ({ selectedUser, messages }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Debug (remove later)
  console.log("Selected User:", selectedUser);
  console.log("Messages:", messages);

  // No user selected
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="text-7xl mb-5">💬</div>

          <h2 className="text-4xl font-bold text-white">
            Welcome to Pulse
          </h2>

          <p className="text-slate-400 mt-3 text-lg">
            Select a user to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6">

      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center">

          <div className="text-6xl mb-4">👋</div>

          <h2 className="text-2xl text-white font-semibold">
            No messages yet
          </h2>

          <p className="text-slate-400 mt-2">
            Say hello to <span className="text-cyan-400">{selectedUser.name}</span>
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {messages.map((msg) => {
            // If sender is selected user => incoming message
            const isIncoming =
              msg.sender === selectedUser._id;

            return (
              <div
                key={msg._id}
                className={`flex ${
                  isIncoming
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-md px-5 py-3 rounded-2xl shadow-lg ${
                    isIncoming
                      ? "bg-slate-700 text-white rounded-bl-sm"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm"
                  }`}
                >
                  <p className="break-words">
                    {msg.text}
                  </p>

                  <p className="text-[11px] text-right text-slate-200 mt-2">
                    {msg.createdAt
                      ? new Date(
                          msg.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef}></div>

        </div>
      )}

    </div>
  );
};

export default ChatWindow;