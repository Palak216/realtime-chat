import Avatar from "../common/Avatar";
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
} from "react-icons/fi";

const ChatHeader = ({ selectedUser }) => {
  return (
    <div className="h-20 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 flex items-center justify-between shadow-lg">

      {selectedUser ? (
        <div className="flex items-center gap-4">

          <Avatar
            name={selectedUser.name}
            online={selectedUser.online}
            size={52}
          />

          <div>

            <h2 className="text-white text-lg font-semibold">
              {selectedUser.name}
            </h2>

            <p
              className={`text-sm ${
                selectedUser.online
                  ? "text-green-400"
                  : "text-slate-400"
              }`}
            >
              {selectedUser.online ? "Online" : "Offline"}
            </p>

          </div>

        </div>
      ) : (
        <div>

          <h2 className="text-2xl font-bold text-white">
            Welcome 👋
          </h2>

          <p className="text-slate-400">
            Select a conversation
          </p>

        </div>
      )}

      {selectedUser && (
        <div className="flex items-center gap-5">

          <button className="hover:bg-slate-800 p-2 rounded-full transition">
            <FiPhone
              size={20}
              className="text-slate-300"
            />
          </button>

          <button className="hover:bg-slate-800 p-2 rounded-full transition">
            <FiVideo
              size={20}
              className="text-slate-300"
            />
          </button>

          <button className="hover:bg-slate-800 p-2 rounded-full transition">
            <FiMoreVertical
              size={20}
              className="text-slate-300"
            />
          </button>

        </div>
      )}

    </div>
  );
};

export default ChatHeader;